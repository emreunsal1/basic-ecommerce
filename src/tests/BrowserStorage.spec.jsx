import { STORAGE } from "../utils/browserStorage";

describe("STORAGE utility functions", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getLocal", () => {
    it("should return false when the value is 'false'", () => {
      Storage.prototype.getItem.mockReturnValue("false");
      const result = STORAGE.getLocal("key");
      expect(result).toBe(false);
    });

    it("should return true when the value is 'true'", () => {
      Storage.prototype.getItem.mockReturnValue("true");
      const result = STORAGE.getLocal("key");
      expect(result).toBe(true);
    });

    it("should return the original value when it is neither 'true' nor 'false'", () => {
      Storage.prototype.getItem.mockReturnValue("some value");
      const result = STORAGE.getLocal("key");
      expect(result).toBe("some value");
    });

    it("should return null when the value is not found", () => {
      Storage.prototype.getItem.mockReturnValue(null);
      const result = STORAGE.getLocal("key");
      expect(result).toBeNull();
    });
  });

  describe("setLocal", () => {
    it("should call localStorage.setItem with correct arguments", () => {
      const key = "testKey";
      const value = "testValue";

      STORAGE.setLocal(key, value);

      expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
    });
  });
});
