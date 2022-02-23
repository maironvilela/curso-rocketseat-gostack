import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterFildProvideToProviderID1612968188140
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    /*  Deleta a coluna "provider" da tabela "appointments" */
    await queryRunner.dropColumn('appointments', 'provider');
    /*  Cria a coluna "provider_id" na tabela "appointments"  */
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        /* Nome do campo */
        name: 'provider_id',
        /* Tipo de informação que será inserida */
        type: 'varchar',
        /* Permite o campo ser nulo */
        isNullable: true,
      }),
    );

    /* Cria a chave estrangeira para relacionar a tabela "appointment"
    com a tabela 'users */
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        /* Nome da foreingKey */
        name: 'FKAppointments',
        /* Nome da coluna que ira receber o relacionamento */
        columnNames: ['provider_id'],
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
    /* Remover a foreignKey */
    await queryRunner.dropForeignKey('appointments', 'FKAppointments');

    /* Remover coluna provider_id */
    await queryRunner.dropColumn('appointments', 'provider_id');

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
