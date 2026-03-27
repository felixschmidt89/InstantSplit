import { customAlphabet } from 'nanoid';
import SYSTEM from '../../../shared/constants/system/systemConstants.js';
import isGroupCodeUnique from '../database/isGroupCodeUnique.js';

const { GROUP_CODE_LENGTH, GROUP_CODE_ALPHABET } = SYSTEM;

const generateCode = customAlphabet(GROUP_CODE_ALPHABET, GROUP_CODE_LENGTH);

const generateGroupCode = async () => {
  let groupCode;
  let isUnique = false;

  while (!isUnique) {
    groupCode = generateCode();
    // eslint-disable-next-line no-await-in-loop
    isUnique = await isGroupCodeUnique(groupCode);
  }

  return groupCode;
};

export default generateGroupCode;
