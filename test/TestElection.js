const Election = artifacts.require('ElectionMock');

const BN = web3.utils.BN;

const getBalance = async (address) => new BN(await web3.eth.getBalance(address));

async function tryCatch(promise, reason) {
  try {
    await promise;
  }
  catch (error) {
    const isErrorOccur = error.message.includes(reason);
    assert.equal(isErrorOccur, true, `Expected to fail with ${reason}, but failed with: ${error.message}`);
  }
};

contract('Election', (accounts) => {
  let election;

  beforeEach('setup contract for each test', async () => {
    election = await Election.new();
  });

  describe('startVoting()', () => {
    it('should work correctly', async () => {
    });

    it('should revert if it is not called by owner', async () => {
    });
  });

  describe('register()', () => {
    it('should work correctly', async () => {
    });

    it('should revert if is in voting peroid', async () => {
    });

    it('should revert if balance is not enough', async () => {
    });

    it('should revert if user is already registered', async () => {
    });
  });

  describe('vote()', () => {
    it('should work correctly', async () => {
    });

    it('should revert if it is not in the voting period', async () => {
    });

    it('should revert if user already voted', async () => {
    });

    it('should revert if user already voted', async () => {
    });
  });

  describe('resetElection()', () => {
    it('should work correclty', async () => {
    });

    it('should work correclty at first round', async () => {
    });

    it('should revert if it is not called by owner', async () => {
    });
  });

  describe('refundDeposit()', () => {
    it('should work correctly', async () => {
    });

    it('should work correctly if candidate not reach the refund ratio', async () => {
    });
  });

  describe('announceElectedPerson()', () => {
    it('should work correctly', async () => {
    });
  });

  describe('getCandidatesList()', () => {
    it('should return list correctly', async () => {
    });
  });

  describe('sponsor()', () => {
    it('should work correctly', async () => {
    });

    it('should revert if is in voting period', async () => {
    });

    it('should revert if is in voting period', async () => {
    });
  });
});
