import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTokens1615322035092 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user_tokens',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },

        {
          name: 'token',
          type: 'uuid',
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },

        {
          name: 'user_id',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },

      ],
      foreignKeys: [
        {
          name: 'FKUserTokens',
          /* Nome da coluna que ira receber o relacionamento */
          columnNames: ['user_id'],
          /* Tabela que será realizada o relacionamento */
          referencedTableName: 'users',
          /* Campo da tabla que será realizar o relacionamento */
          referencedColumnNames: ['id'],
          /* Estrategia adotada em caso de remoção do token */
          onDelete: 'CASCADE',
          /* Estrategia para refletir alteracao do id em caso de alteração do token */
          onUpdate: 'CASCADE',
        }
      ]


    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('user_tokens')
  }

}
