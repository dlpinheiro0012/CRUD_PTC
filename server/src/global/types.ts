/*
Dentro dos tipos, eu optei por definir cada parâmetro das entidades
para chamar em uma função de tipo de criação delas, a qual omite o valor
do ID. Ou seja, o Id é gerado automaticamente para cada um dos objetos
criados, mas sem que seja declarado na criação. Especificamente para o usuário,
também foram omitidas as datas de criação e update, pelo mesmo motivo
*/

type Calcado = {
  id: string;
  nome_produto: string;
  cor: string;
  marca: string;
  tamanho: number;
  preco: number;
  quantidade_em_estoque: number;
};

type CreateCalcadoDTO = Omit<Calcado, 'id'>;

type User =  {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  password: string;
  createdAt: Date;
  updatedAt: Date
};

type CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

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
