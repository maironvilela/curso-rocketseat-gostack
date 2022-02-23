import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddUserIdToAppointments1615634190292 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        /* Nome da foreingKey */
        name: 'FKUsers',
        /* Nome da coluna que ira receber o relacionamento */
        columnNames: ['user_id'],
        /* Tabela que será realizada o relacionamento */
        referencedTableName: 'users',
        /* Campo da tabla que será realizar o relacionamento */
        referencedColumnNames: ['id'],
        /* Estrategia adotada em caso de remoção do usuario */
        onDelete: 'SET NULL',
        /* Estrategia em caso de alteração do usuario */
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'FKAppointments');

    /* Remover coluna provider_id */
    await queryRunner.dropColumn('appointments', 'user_id');

    /* Criar a coluna provider */
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
