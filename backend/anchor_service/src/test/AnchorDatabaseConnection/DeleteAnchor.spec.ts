import DatabaseConnection from '../../dbConfig';

describe('Delete Anchor', () => {  
  beforeAll(async done => {
    const response = await DatabaseConnection.clearAnchorCollection()
    expect(response.success).toBeTruthy()

    const createResponse = await DatabaseConnection.initAnchors([
      {
        nodeId: 'node.a',
        anchorId: 'anchor.a',
		contentList: ["I like this a lot!", "great job"],
		authorList: ["Xinzhe Chai", "Jinoo"],
		type: "media",
		createdAt: new Date()
      },
      {
        nodeId: 'node.b',
        anchorId: 'anchor.b',
		contentList: ["I like this a lot!", "great job"],
		authorList: ["Xinzhe Chai", "Jinoo"],
		type: "immutable-text",
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

  test("deletes non-existent anchor", async done => {
    const response = await DatabaseConnection.deleteAnchor('anchor.c')
    expect(response.success).toBeTruthy()
    done()
  })

  test("deletes existent anchor", async done => {
    const response = await DatabaseConnection.deleteAnchor('anchor.a')
    expect(response.success).toBeTruthy()
    done()
  })

  test("fails on null", async (done) => {
    const response = await DatabaseConnection.deleteAnchor(null);
    expect(response.success).toBeFalsy();
    done();
  });
})