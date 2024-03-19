import { getDB }  from './mongoConnection.js'

const getCollectionFn = (collection) => {
    let _col = undefined;
  
    return async () => {
      if (!_col) {
        const db = await getDB();
        _col = await db.collection(collection);
      }
  
      return _col;
    };
  };
  
  /* Now, you can list your collections here: */
  export const patients = getCollectionFn('patients');
  