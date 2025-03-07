export class DatabaseCommand {
    public command: string;
    public rowCount: number;
    public rows: { id: string }[];
    public fields: {
      name: string;
      dataTypeID: number;
      tableID: number;
      columnID: number;
      dataTypeSize: number;
      dataTypeModifier: number;
      format: string;
    }[];
    public rowAsArray: boolean;
    public viaNeonFetch: boolean;
  
    constructor({
      command,
      rowCount,
      rows,
      fields,
      rowAsArray,
      viaNeonFetch,
    }: {
      command: string;
      rowCount: number;
      rows: { id: string }[];
      fields: {
        name: string;
        dataTypeID: number;
        tableID: number;
        columnID: number;
        dataTypeSize: number;
        dataTypeModifier: number;
        format: string;
      }[];
      rowAsArray: boolean;
      viaNeonFetch: boolean;
    }) {
      this.command = command;
      this.rowCount = rowCount;
      this.rows = rows;
      this.fields = fields;
      this.rowAsArray = rowAsArray;
      this.viaNeonFetch = viaNeonFetch;
    }
  }