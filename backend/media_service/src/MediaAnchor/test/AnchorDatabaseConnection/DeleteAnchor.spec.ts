import AnchorDatabaseConnection from '../../dbConfig';

describe('Delete Anchors', () => {  
  beforeAll(async done => {
    const response = await AnchorDatabaseConnection.clearAnchorCollection()
    expect(response.success).toBeTruthy()

    const createResponse = await AnchorDatabaseConnection.initAnchors([
      {
        anchorId: 'a',
        mediaTimeStamp: 100
      },
      {
        anchorId: 'b',
        mediaTimeStamp: 100
      }
    ])
    expect(createResponse.success).toBeTruthy()
    done()
  })

  afterAll(async done => {
    const response = await AnchorDatabaseConnection.clearAnchorCollection()
    expect(response.success).toBeTruthy()
    done()
  })

  test("deletes non-existent document", async done => {
    const response = await AnchorDatabaseConnection.deleteAnchor('a')
    expect(response.success).toBeTruthy()
    done()
  })

  test("deletes existent document", async done => {
    const response = await AnchorDatabaseConnection.deleteAnchor('c')
    expect(response.success).toBeTruthy()
    done()
  })
})