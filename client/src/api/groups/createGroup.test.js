import axios from "axios";
import { createGroup } from "./createGroup";
import {
  MOCK_API_RESPONSES,
  MOCK_GROUP_DATA,
  MOCK_FULL_URLS,
} from "@shared-constants/testConstants";

jest.mock("axios");

describe("createGroup API Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should perform a POST request to the correct endpoint with the correct payload", async () => {
    axios.post.mockResolvedValue({
      data: MOCK_API_RESPONSES.GROUPS.CREATE_SUCCESS,
    });

    const result = await createGroup(MOCK_GROUP_DATA.NAME);

    expect(axios.post).toHaveBeenCalledWith(MOCK_FULL_URLS.GROUPS, {
      groupName: MOCK_GROUP_DATA.NAME,
    });

    expect(result).toEqual(MOCK_API_RESPONSES.GROUPS.CREATE_SUCCESS);
  });

  it("should propagate errors when the network request fails", async () => {
    const MOCK_ERROR = new Error("Network Error");
    axios.post.mockRejectedValue(MOCK_ERROR);

    await expect(createGroup(MOCK_GROUP_DATA.NAME)).rejects.toThrow(
      "Network Error",
    );
  });
});
