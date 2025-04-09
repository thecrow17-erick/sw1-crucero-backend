import { Prisma } from "@prisma/client";


export interface OptionUser {
  skip?: number;
  take?: number;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
  select?: Prisma.UserSelect;
  cursor?: Prisma.UserWhereUniqueInput,
  distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[],
  include?:   Prisma.UserInclude,
}