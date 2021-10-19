import { expect } from 'chai';

describe("date check", () => {
  describe("tag", () => {
    it("correct conversion", () => {
      const tag = "2021-10-18T15:32:04Z"
      const tag_date_value = 1634571124000;

      const date = Date.parse(tag);

      expect(date).to.equal(tag_date_value);
    });
  });
})