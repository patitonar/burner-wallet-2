import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { xdai, dai, eth } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway, } from '@burner-wallet/core/gateways';
import Exchange, { Uniswap, XDaiBridge } from '@burner-wallet/exchange';
import ModernUI from '@burner-wallet/modern-ui';
import ENSPlugin from '@burner-wallet/ens-plugin';
import MetamaskPlugin from '@burner-wallet/metamask-plugin';
import { BurnerConnectPlugin } from '@burner-wallet/burner-connect-wallet';
import 'worker-loader?name=burnerprovider.js!./burnerconnect'; // eslint-disable-line import/no-webpack-loader-syntax

const core = new BurnerCore({
  signers: [
    new LocalSigner(),
    new InjectedSigner(),
  ],
  gateways: [
    new InjectedGateway(),
    new InfuraGateway(process.env.REACT_APP_INFURA_KEY),
    new XDaiGateway(),
  ],
  assets: [xdai, dai, eth],
});

const exchange = new Exchange([new XDaiBridge(), new Uniswap('dai')]);

const BurnerWallet = () =>
  <ModernUI
    core={core}
    plugins={[
      exchange,
      new ENSPlugin(),
      new MetamaskPlugin(),
      new BurnerConnectPlugin('Basic Wallet'),
    ]}
  />



ReactDOM.render(<BurnerWallet />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
