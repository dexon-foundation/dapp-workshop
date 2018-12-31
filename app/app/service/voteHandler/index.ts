import { observable, computed } from 'mobx';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { abi } from './constants';

declare global {
  interface Window {
      dexon : any;
      ethereum : any;
  }
}

const DEXON_TESTNET_ID = 238;
const WS_PROVIDER = () => {
  if (window.ethereum) {
    return `ws://${window.location.hostname}:8545`;
  }
  return (window.location.hostname === 'localhost')
  ? 'ws://testnet.dexon.org:8546'
  : 'wss://ws-proxy.dexon.org';
};

const INJECTED = window.dexon || window.ethereum;

class VoteHandler {

  public web3;
  @observable public initDone : boolean = false;
  @observable public contractDataLoaded : boolean = false;
  @observable public isVoting : boolean;
  @observable public round;
  @observable public guaranteedDeposit : string;
  @observable public candidatesList : Array<string> = [];
  @observable public candidateData : {
    [addr : string] : {
      name : string,
      vote : string,
      candidateNumber : string,
    }
  } = {};
  @observable public electedPerson : {
    [round : string] : {
      name : string,
      vote : string,
      candidate : string,
    }
  } = {};
  @observable public sponsorHistory : Array<{
    amount : string,
    round : string,
    candidate : string,
    sponsor : string,
    name : string,
  }> = [];
  @observable public refundHistory : Array<{
    amount : string,
    round : string,
    candidate : string,
    name : string,
  }> = [];

  public contractInit = debounce(async (address : string) => {
    try {
      this.contractWrite = new this.walletHandler.eth.Contract(abi, address);
      this.contractRead = new this.wsHandler.eth.Contract(abi, address);
      this.updateContractData();
      this.subscribeData();
    } catch(e) {
      alert(`init failed: ${e}`);
    }

  }, 200);

  @computed public get guaranteeDepositInDxn() {
    return this.guaranteedDeposit && this.web3.utils.fromWei(this.guaranteedDeposit);
  }

  private walletHandler; // DekuSan Wallet
  private wsHandler; // WS provider

  private contractWrite;
  private contractRead;

  private subscriber = [];

  /**
   * Update data from contract
   * You need to fetch data form contract and assign the value to
   * `candidateData`, `isVoting`, `round`, `candidatesList`, `guaranteedDeposit`
   * 
   * @todo Implement this function.
   */
  private updateContractData = throttle(async () => {
    
  }, 500);

  constructor() {
    this.init();
  }

  /**
   * Start a new round of the election
   * 
   * @todo Implement this function.
   */
  public startVoting() {

  }

  /**
   * Reset the election and announce the elected person
   * 
   * @todo Implement this function.
   */
  public resetElection() {

  }

  /**
   * Vote to the candidate
   * 
   * @todo Implement this function.
   * @param address - candidate address
   */
  public vote(address : string) {

  }

  /**
   * Register to be a election candidate
   * 
   * @todo Implement this function.
   * @param name - candidate name
   */
  public register(name : string) {

  }

  /**
   * Sponsor candidate for the election
   * 
   * @todo Implement this function.
   * @param address - candidate address
   * @param amount - amount of DEXON token
   */
  public sponsorCandidate(address : string, amount : string) {

  }

  /**
   * Helper function to transform Dei to Dex
   *
   * @todo Implement this function.
   * @param amount - amount of DEXON token (in Dei unit)
   */
  public deiToDex = (amount: string) => {

  }

  /**
   * Helper function to transform Dex to Dei
   *
   * @todo Implement this function.
   * @param amount - amount of DEXON token
   */
  public dexToDei = (amount: string) => {

  }

  /**
   * Helper function about sending a trasaction to contract and execute its method
   *
   * @todo Implement this function. (hint: becareful about the permission to access user's account)
   * @param method - contract method name you want to call
   * @param params - array of parameters to pass to contract method
   */
  private writeContract = async (
    method : string, params : Array<any>, value? : string
  ) => {

  }

  private init = async () => {
    this.web3 = await  import(/* webpackChunkName: "web3" */'web3');
    if (!INJECTED) {
      alert('Please install DekuSan Wallet');
      return;
    }
    this.walletHandler = new this.web3.default(INJECTED);
    const netId = await this.getNetworkId();
    if (
      (netId !== DEXON_TESTNET_ID) &&
      (window.location.hostname !== 'localhost')
    ) {
      alert('Please Select "DEXON Test Network" in DekuSan wallet');
      return;
    }
    this.wsHandler = new this.web3.default(WS_PROVIDER());
    this.initDone = true;

    // this.contractInit('contract address');
  }

  private getNetworkId = () => this.walletHandler.eth.net.getId();

  /**
   * Get wallet first address in the account list
   *
   * @todo Implement this function.
   * @returns first address in the account list
   */
  private getWalletAddress = async () => {
  }

  /**
   * Subscribe all events we need and store those data to
   * `electedPerson`, `sponsorHistory`, `refundHistory`
   * 
   * History data also need to fetch from here.
   * 
   * Events: `elected`, `sponsorCandidate`, `refund`, `voteStart`, `registered`, `reset` and `voteCandidate`
   * (Hint: you only need to fetch data again when receive `voteStart`, `registered`, `reset` and `voteCandidate`)
   * 
   * @todo Implement this function.
   * @returns first address in the account list
   */
  private async subscribeData() {
    this.unsubscribeAndClearAll();

  }

  /**
   * Helper function about subscribing the event from contract
   *
   * @todo Implement this function.
   * @param eventName - event name
   * @param cb - callback function
   */
  private handleSubscribe(eventName : string, cb : (...args : Array<any>) => any) {
    const subscriber = undefined; // your subscription logic need to assign to subscriber variable

    this.subscriber.push(subscriber);
  }

  private unsubscribeAndClearAll() {
    this.electedPerson = {};
    this.sponsorHistory = [];
    this.refundHistory = [];
    this.subscriber.forEach((sub) => sub.unsubscribe && sub.unsubscribe());
    this.subscriber = [];
  }
}

const voteService = new VoteHandler();

export default voteService;
