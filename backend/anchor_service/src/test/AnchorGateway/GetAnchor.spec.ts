import { IAnchorGateway } from 'spectacle-interfaces';
import DatabaseConnection from '../../dbConfig';
import AnchorGateway from '../../gateway/AnchorGateway';

describe('Unit Test: Get Anchor', () => {
  const anchorGateway: IAnchorGateway = new AnchorGateway(DatabaseConnection)

  beforeAll(async done => {
    const response = await DatabaseConnection.clearAnchorCollection()
    expect(response.success).toBeTruthy()

    const createResponse = await DatabaseConnection.initAnchors([
      {
        anchorId: 'a',
        nodeId: 'node.a',
        contentList: ["content A"],
        authorList: ["author A"],
		type: "media",
		createdAt: new Date()
      },
      {
        anchorId: 'b',
        nodeId: 'node.b',
        contentList: ["content B"],
        authorList: ["author B"],
		type: "media",
		createdAt: new Date()
      }
    ])
    expect(createResponse.success).toBeTruthy()
    done()
  })

  afterAll(async done => {
    const response = await DatabaseConnection.clearAnchorCollection()
    expect(response.success).toBeTruthy()
    done()
  })

  test("doesn't get non-existent anchor", async done => {
    const getResponse = await anchorGateway.getAnchor('bad_id')
    expect(getResponse.success).toBeFalsy()
    done()
  })

  test("successfully gets anchor", async done => {
    const getResponse = await anchorGateway.getAnchor('a')
    expect(getResponse.success).toBeTruthy()
    expect(getResponse.payload.anchorId).toBe('a')
    expect(getResponse.payload.nodeId).toBe('node.a')
    expect(getResponse.payload.contentList).toEqual(["content A"])
    expect(getResponse.payload.authorList).toEqual(["author A"])
    done()
  })
})