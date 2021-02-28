<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210224125937 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE agence ADD compte_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE agence ADD CONSTRAINT FK_64C19AA9F2C56620 FOREIGN KEY (compte_id) REFERENCES compte (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_64C19AA9F2C56620 ON agence (compte_id)');
        $this->addSql('ALTER TABLE transaction ADD compte_transaction_id INT DEFAULT NULL, ADD user_depot_id INT DEFAULT NULL, ADD user_retrait_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1EFA91D7C FOREIGN KEY (compte_transaction_id) REFERENCES compte (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1659D30DE FOREIGN KEY (user_depot_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1D99F8396 FOREIGN KEY (user_retrait_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_723705D1EFA91D7C ON transaction (compte_transaction_id)');
        $this->addSql('CREATE INDEX IDX_723705D1659D30DE ON transaction (user_depot_id)');
        $this->addSql('CREATE INDEX IDX_723705D1D99F8396 ON transaction (user_retrait_id)');
        $this->addSql('ALTER TABLE user ADD agence_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649D725330D FOREIGN KEY (agence_id) REFERENCES agence (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649D725330D ON user (agence_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE agence DROP FOREIGN KEY FK_64C19AA9F2C56620');
        $this->addSql('DROP INDEX UNIQ_64C19AA9F2C56620 ON agence');
        $this->addSql('ALTER TABLE agence DROP compte_id');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1EFA91D7C');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1659D30DE');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1D99F8396');
        $this->addSql('DROP INDEX IDX_723705D1EFA91D7C ON transaction');
        $this->addSql('DROP INDEX IDX_723705D1659D30DE ON transaction');
        $this->addSql('DROP INDEX IDX_723705D1D99F8396 ON transaction');
        $this->addSql('ALTER TABLE transaction DROP compte_transaction_id, DROP user_depot_id, DROP user_retrait_id');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649D725330D');
        $this->addSql('DROP INDEX IDX_8D93D649D725330D ON user');
        $this->addSql('ALTER TABLE user DROP agence_id');
    }
}
