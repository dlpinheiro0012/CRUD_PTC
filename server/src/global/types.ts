type Calcado = {
  id: string;
  nome: string;
  marca: string;
  tamanho: number;
  preco: number;
};

type CreateCalcadoDTO = Omit<Calcado, 'id'>;

type User =  {
  id: string,
  nome: string,
  email: string,
  cpf: string,
  password: string
};

type CreateUserDTO = Omit<User, 'id'>;

type InsertableDatabase = {
  httpStatus: number;
  message: string;
};

type GetableDatabase<Type> = {
  values: [] | Type[];
  httpStatus: number;
};

type RemoveableDatabase = {
  httpStatus: number;
  messageFromDelete: String;
};

type FindableDatabaseValue<Type> = {
  value: Type | undefined;
  httpStatus: number;
};

type UpdatableDatabaseValue = {
  httpStatus: number;
  messageFromUpdate: String;
};

export {
  Calcado,
  CreateCalcadoDTO,
  User,
  CreateUserDTO,
  InsertableDatabase,
  GetableDatabase,
  RemoveableDatabase,
  FindableDatabaseValue,
  UpdatableDatabaseValue,
};
