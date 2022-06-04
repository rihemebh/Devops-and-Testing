

export const MockAuthService = jest.fn().mockReturnValue({
 createToken : jest.fn().mockResolvedValue({acess_token : ''}),
})