import { EntitySchema } from "typeorm";

export const TodoEntity = new EntitySchema({
  name: "Todo",
  tableName: "todos",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    title: {
      type: "varchar",
      length: 200,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: true,
    },
    completed: {
      type: "boolean",
      default: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: { name: "userId" },
      nullable: false,
    },
  },
});