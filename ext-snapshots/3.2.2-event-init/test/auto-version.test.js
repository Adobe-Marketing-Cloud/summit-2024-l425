/* 
* <license header>
*/

jest.mock('@adobe/aio-sdk', () => ({
  Core: {
    Logger: jest.fn()
  }
}))
const { Core } = require('@adobe/aio-sdk')
const mockLoggerInstance = { info: jest.fn() }
Core.Logger.mockReturnValue(mockLoggerInstance)

const action = require('./../actions/auto-version/index.js')

beforeEach(() => {
  Core.Logger.mockClear()
  mockLoggerInstance.info.mockReset()
})

describe('test event action', () => {
  test('main should be defined', () => {
    expect(action.main).toBeInstanceOf(Function)
  })
  test('should set logger to use LOG_LEVEL param', async () => {
    await action.main({LOG_LEVEL: 'fakeLevel'})
    expect(Core.Logger).toHaveBeenCalledWith('main',
        {level: 'fakeLevel'})
  })
})
