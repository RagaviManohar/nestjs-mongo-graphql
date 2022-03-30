export const mockUserInput = {
  email: "test@test.com",
  name: "test",
  walletDetails: {
    walletAddress: "test12345",
    walletName: "test wallet",
  },
};

export const mockUserDetails = {
  _id: "68a686d4-3d6d-45f8-b50c-d7de21ae4c2b",
  ...mockUserInput,
};

export const mockUserList = [
  {
    ...mockUserDetails,
  },
];
