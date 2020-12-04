import { IAnchor } from 'spectacle-interfaces';
import DatabaseConnection from '../../dbConfig';

const testAnchor: IAnchor = {
    anchorId: "test.anchor",
    nodeId: "test.node",
    content: "I like this a lot!",
	type: "media",
	createdAt: new Date()
}

describe('Insert Anchor', () => {

    test("inserts anchor, doesn't insert duplicate anchor id", async done => {
    const dResponse = await DatabaseConnection.clearAnchorCollection()
    expect(dResponse.success).toBeTruthy()

    const createResponse = await DatabaseConnection.insertAnchor(testAnchor)
    expect(createResponse.success).toBeTruthy()
    expect(createResponse.payload).toStrictEqual(testAnchor)

    const createResponse2 = await DatabaseConnection.insertAnchor(testAnchor)
    expect(createResponse2.success).toBeFalsy()
    done()
  })

    test("fails to insert an invalid anchor", async done => {
    let invalid: any = {
        anchorId: "anchor",
        randomField: "random"
    }
    const response = await DatabaseConnection.insertAnchor(invalid)
    expect(response.success).toBeFalsy()

    let invalid2: IAnchor = {
        anchorId: "",
        nodeId: "",
        content: "I like this a lot!",
		type: "media",
		createdAt: new Date()
    }
    const response2 = await DatabaseConnection.insertAnchor(invalid2)
    expect(response2.success).toBeFalsy()

    let invalid3: IAnchor = {
        anchorId: null,
        nodeId: "",
        content: "I like this a lot!",
		type: "media",
		createdAt: new Date()
    }
    const response3 = await DatabaseConnection.insertAnchor(invalid3)
    expect(response3.success).toBeFalsy()

    let invalid4: IAnchor = {
        anchorId: "anchor",
        nodeId: null,
        content: "I like this a lot!",
		type: "media",
		createdAt: new Date()
    }
    const response4 = await DatabaseConnection.insertAnchor(invalid4)
	expect(response4.success).toBeFalsy()
	
	let invalid5: IAnchor = {
        anchorId: "anchor",
        nodeId: "hello",
        content: null,
		type: "media",
		createdAt: new Date()
    }
    const response5 = await DatabaseConnection.insertAnchor(invalid5)
	expect(response5.success).toBeFalsy()
	
	let invalid6: IAnchor = {
        anchorId: "anchor",
        nodeId: "hello",
        content: "null",
		type: null,
		createdAt: new Date()
    }
    const response6 = await DatabaseConnection.insertAnchor(invalid6)
	expect(response6.success).toBeFalsy()
	
	let invalid7: IAnchor = {
        anchorId: "anchor",
        nodeId: "hello",
        content: "",
		type: "media",
		createdAt: new Date()
    }
    const response7 = await DatabaseConnection.insertAnchor(invalid7)
	expect(response7.success).toBeFalsy()
	
	let valid: IAnchor = {
        anchorId: "anchor",
        nodeId: "hello",
        content: "null",
		type: "media",
		createdAt: new Date()
    }
    const response8 = await DatabaseConnection.insertAnchor(valid)
    expect(response8.success).toBeTruthy()
    done()
    })

    test("fails on null", async (done) => {
        const response = await DatabaseConnection.insertAnchor(null);
        expect(response.success).toBeFalsy();
        done();
      });
})