package common

import (
	"bytes"
	"encoding/binary"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"time"

	"github.com/wormhole-foundation/wormhole/sdk/vaa"

	"github.com/ethereum/go-ethereum/common"
)

type SinglePublication struct {
	TxHash    common.Hash // TODO: rename to identifier? on Solana, this isn't actually the tx hash
	Timestamp time.Time

	Nonce            uint32
	Sequence         uint64
	ConsistencyLevel uint8
	EmitterChain     vaa.ChainID
	EmitterAddress   vaa.Address
	Payload          []byte

	// Unreliable indicates if this message can be reobserved. If a message is considered unreliable it cannot be
	// reobserved.
	Unreliable bool
}

func (msg *SinglePublication) GetTxHash() common.Hash {
	return msg.TxHash
}

func (msg *SinglePublication) GetTimestamp() time.Time {
	return msg.Timestamp
}

func (msg *SinglePublication) GetEmitterChain() vaa.ChainID {
	return msg.EmitterChain
}

func (msg *SinglePublication) IsUnreliable() bool {
	return msg.Unreliable
}

func (msg *SinglePublication) MessageID() []byte {
	return []byte(msg.MessageIDString())
}

func (msg *SinglePublication) MessageIDString() string {
	return fmt.Sprintf("%v/%v/%v", uint16(msg.EmitterChain), msg.EmitterAddress, msg.Sequence)
}

const minMsgLength = 88

func (msg *SinglePublication) Marshal() ([]byte, error) {
	buf := new(bytes.Buffer)

	buf.Write(msg.TxHash[:])
	vaa.MustWrite(buf, binary.BigEndian, uint32(msg.Timestamp.Unix()))
	vaa.MustWrite(buf, binary.BigEndian, msg.Nonce)
	vaa.MustWrite(buf, binary.BigEndian, msg.Sequence)
	vaa.MustWrite(buf, binary.BigEndian, msg.ConsistencyLevel)
	vaa.MustWrite(buf, binary.BigEndian, msg.EmitterChain)
	buf.Write(msg.EmitterAddress[:])
	buf.Write(msg.Payload)

	return buf.Bytes(), nil
}

// Unmarshal deserializes the binary representation of a VAA
func UnmarshalMessagePublication(data []byte) (*SinglePublication, error) {
	if len(data) < minMsgLength {
		return nil, fmt.Errorf("message is too short")
	}

	msg := &SinglePublication{}

	reader := bytes.NewReader(data[:])

	txHash := common.Hash{}
	if n, err := reader.Read(txHash[:]); err != nil || n != 32 {
		return nil, fmt.Errorf("failed to read TxHash [%d]: %w", n, err)
	}
	msg.TxHash = txHash

	unixSeconds := uint32(0)
	if err := binary.Read(reader, binary.BigEndian, &unixSeconds); err != nil {
		return nil, fmt.Errorf("failed to read timestamp: %w", err)
	}
	msg.Timestamp = time.Unix(int64(unixSeconds), 0)

	if err := binary.Read(reader, binary.BigEndian, &msg.Nonce); err != nil {
		return nil, fmt.Errorf("failed to read nonce: %w", err)
	}

	if err := binary.Read(reader, binary.BigEndian, &msg.Sequence); err != nil {
		return nil, fmt.Errorf("failed to read sequence: %w", err)
	}

	if err := binary.Read(reader, binary.BigEndian, &msg.ConsistencyLevel); err != nil {
		return nil, fmt.Errorf("failed to read consistency level: %w", err)
	}

	if err := binary.Read(reader, binary.BigEndian, &msg.EmitterChain); err != nil {
		return nil, fmt.Errorf("failed to read emitter chain: %w", err)
	}

	emitterAddress := vaa.Address{}
	if n, err := reader.Read(emitterAddress[:]); err != nil || n != 32 {
		return nil, fmt.Errorf("failed to read emitter address [%d]: %w", n, err)
	}
	msg.EmitterAddress = emitterAddress

	payload := make([]byte, vaa.InternalTruncatedPayloadSafetyLimit)
	n, err := reader.Read(payload)
	if err != nil || n == 0 {
		return nil, fmt.Errorf("failed to read payload [%d]: %w", n, err)
	}
	msg.Payload = payload[:n]

	return msg, nil
}

// The standard json Marshal / Unmarshal of time.Time gets confused between local and UTC time.
func (msg *SinglePublication) MarshalJSON() ([]byte, error) {
	type Alias SinglePublication
	return json.Marshal(&struct {
		Timestamp int64
		*Alias
	}{
		Timestamp: msg.Timestamp.Unix(),
		Alias:     (*Alias)(msg),
	})
}

func (msg *SinglePublication) UnmarshalJSON(data []byte) error {
	type Alias SinglePublication
	aux := &struct {
		Timestamp int64
		*Alias
	}{
		Alias: (*Alias)(msg),
	}
	if err := json.Unmarshal(data, &aux); err != nil {
		return err
	}
	msg.Timestamp = time.Unix(aux.Timestamp, 0)
	return nil
}

func (msg *SinglePublication) CreateVAA(gsIndex uint32) *vaa.VAA {
	return &vaa.VAA{
		Version:          vaa.SupportedVAAVersion,
		GuardianSetIndex: gsIndex,
		Signatures:       nil,
		Timestamp:        msg.Timestamp,
		Nonce:            msg.Nonce,
		EmitterChain:     msg.EmitterChain,
		EmitterAddress:   msg.EmitterAddress,
		Payload:          msg.Payload,
		Sequence:         msg.Sequence,
		ConsistencyLevel: msg.ConsistencyLevel,
	}
}

func (msg *SinglePublication) CreateDigest() string {
	v := msg.CreateVAA(0) // The guardian set index is not part of the digest, so we can pass in zero.
	db := v.SigningMsg()
	return hex.EncodeToString(db.Bytes())
}

type MessagePublication interface {
	GetTxHash() common.Hash
	GetTimestamp() time.Time
	GetEmitterChain() vaa.ChainID

	// IsUnreliable indicates if this message can be reobserved. If a message is considered unreliable it cannot be
	// reobserved.
	IsUnreliable() bool
}
