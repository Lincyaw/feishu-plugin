import { bitable } from '@lark-base-open/js-sdk';

export const fetchTableData = async () => {
  const table = await bitable.base.getTable("论文关系表");
  const records = await table.getRecords({
    pageSize: 5000,
  });

  const nodesMap = new Map();
  const edges = [];

  for (const record of records.records) {
    for (const from of record.fields.fldXO8AWUw.recordIds) {
      if (!nodesMap.has(from)) {
        nodesMap.set(from, { id: from, label: record.fields.fldXO8AWUw.text });
      }
      for (const to of record.fields.fldlGpQosO.recordIds) {
        if (!nodesMap.has(to)) {
          nodesMap.set(to, { id: to, label: record.fields.fldlGpQosO.text });
        }
        edges.push({ from, to, arrows: 'to' });
      }
    }
  }

  const nodesArray = Array.from(nodesMap.values());
  return { nodesArray, edges };
};
