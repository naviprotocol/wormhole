// SPDX-License-Identifier: Apache 2

#[test_only]
module token_bridge::coin_wrapped_12 {
    use sui::balance::{Balance, Supply};
    use sui::package::{UpgradeCap};
    use sui::test_scenario::{Self, Scenario};
    use sui::transfer::{Self};
    use sui::tx_context::{Self, TxContext};

    use token_bridge::asset_meta::{Self, AssetMeta};
    use token_bridge::create_wrapped::{Self, WrappedAssetSetup};
    use token_bridge::state::{Self};
    use token_bridge::token_registry::{Self};
    use token_bridge::wrapped_asset::{Self};

    struct COIN_WRAPPED_12 has drop {}

    const VAA: vector<u8> =
        x"0100000000010080366065746148420220f25a6275097370e8db40984529a6676b7a5fc9feb11755ec49ca626b858ddfde88d15601f85ab7683c5f161413b0412143241c700aff010000000100000001000200000000000000000000000000000000000000000000000000000000deadbeef000000000150eb23000200000000000000000000000000000000000000000000000000000000beefface00020c424545460000000000000000000000000000000000000000000000000000000042656566206661636520546f6b656e0000000000000000000000000000000000";

    const UPDATED_VAA: vector<u8> =
        x"01000000000100b0571650590e147fce4eb60105e0463522c1244a97bd5dcb365d3e7bc7f32e4071e18c31bd8240bff6451991c86cb9176003379ba470a5124245b60547516ecc010000000000000045000200000000000000000000000000000000000000000000000000000000deadbeef00000000000000010f0200000000000000000000000000000000000000000000000000000000beefface00020c0000000000000000000000000000424545463f3f3f20616e642070726f66697400000042656566206661636520546f6b656e3f3f3f20616e642070726f666974";

    #[test_only]
    fun init(witness: COIN_WRAPPED_12, ctx: &mut TxContext) {
        let (
            setup,
            upgrade_cap
        ) =
            create_wrapped::new_setup_test_only(
                witness,
                VAA,
                ctx
            );
        transfer::public_transfer(setup, tx_context::sender(ctx));
        transfer::public_transfer(upgrade_cap, tx_context::sender(ctx));
    }

    public fun encoded_vaa(): vector<u8> {
        VAA
    }

    public fun encoded_updated_vaa(): vector<u8> {
        UPDATED_VAA
    }

    public fun token_meta(): AssetMeta {
        asset_meta::deserialize(
            wormhole::vaa::peel_payload_from_vaa(&VAA)
        )
    }

    public fun updated_token_meta(): AssetMeta {
        asset_meta::deserialize(
            wormhole::vaa::peel_payload_from_vaa(&UPDATED_VAA)
        )
    }

    #[test_only]
    /// for a test scenario, simply deploy the coin and expose `Supply`.
    public fun init_and_take_supply(
        scenario: &mut Scenario,
        caller: address
    ): Supply<COIN_WRAPPED_12> {
        use token_bridge::create_wrapped::{take_supply};

        // Ignore effects.
        test_scenario::next_tx(scenario, caller);

        // Publish coin.
        init(COIN_WRAPPED_12 {}, test_scenario::ctx(scenario));

        // Ignore effects.
        test_scenario::next_tx(scenario, caller);

        take_supply(test_scenario::take_from_sender(scenario))
    }

    #[test_only]
    /// For a test scenario, register this wrapped asset.
    ///
    /// NOTE: Even though this module is `#[test_only]`, this method is tagged
    /// with the same macro  as a trick to allow another method within this
    /// module to call `init` using OTW.
    public fun init_and_register(scenario: &mut Scenario, caller: address) {
        use token_bridge::token_bridge_scenario::{return_state, take_state};
        use wormhole::wormhole_scenario::{parse_and_verify_vaa};

        // Ignore effects.
        test_scenario::next_tx(scenario, caller);

        // Publish coin.
        init(COIN_WRAPPED_12 {}, test_scenario::ctx(scenario));

        // Ignore effects.
        test_scenario::next_tx(scenario, caller);

        let token_bridge_state = take_state(scenario);

        let verified_vaa = parse_and_verify_vaa(scenario, VAA);
        let msg =
            token_bridge::vaa::verify_only_once(
                &mut token_bridge_state,
                verified_vaa
            );

        // Ignore effects.
        test_scenario::next_tx(scenario, caller);

        // Register the attested asset.
        create_wrapped::complete_registration(
            &mut token_bridge_state,
            test_scenario::take_from_sender<WrappedAssetSetup<COIN_WRAPPED_12>>(
                scenario
            ),
            test_scenario::take_from_sender<UpgradeCap>(scenario),
            msg,
            test_scenario::ctx(scenario)
        );

        // Clean up.
        return_state(token_bridge_state);
    }

    #[test_only]
    /// NOTE: Even though this module is `#[test_only]`, this method is tagged
    /// with the same macro as a trick to allow another method within this
    /// module to call `init` using OTW.
    public fun init_register_and_mint(
        scenario: &mut Scenario,
        caller: address,
        amount: u64
    ): Balance<COIN_WRAPPED_12> {
        use token_bridge::token_bridge_scenario::{return_state, take_state};

        // First publish and register.
        init_and_register(scenario, caller);

        // Ignore effects.
        test_scenario::next_tx(scenario, caller);

        let token_bridge_state = take_state(scenario);
        let minted =
            wrapped_asset::mint_test_only(
                token_registry::borrow_mut_wrapped_test_only(
                    state::borrow_mut_token_registry_test_only(
                        &mut token_bridge_state
                    )
                ),
                amount
            );

        return_state(token_bridge_state);

        minted
    }
}

#[test_only]
module token_bridge::coin_wrapped_12_tests {
    use token_bridge::asset_meta::{Self};
    use token_bridge::coin_wrapped_12::{token_meta};

    #[test]
    public fun test_native_decimals() {
        let meta = token_meta();
        assert!(asset_meta::native_decimals(&meta) == 12, 0);
        asset_meta::destroy(meta);
    }
}
