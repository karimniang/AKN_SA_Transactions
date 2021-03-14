<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210309224612 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transaction ADD depot_admin_agence_id INT DEFAULT NULL, ADD retrait_admin_agence_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1E52E372F FOREIGN KEY (depot_admin_agence_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1B4A3C8A4 FOREIGN KEY (retrait_admin_agence_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_723705D1E52E372F ON transaction (depot_admin_agence_id)');
        $this->addSql('CREATE INDEX IDX_723705D1B4A3C8A4 ON transaction (retrait_admin_agence_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1E52E372F');
        $this->addSql('ALTER TABLE transaction DROP FOREIGN KEY FK_723705D1B4A3C8A4');
        $this->addSql('DROP INDEX IDX_723705D1E52E372F ON transaction');
        $this->addSql('DROP INDEX IDX_723705D1B4A3C8A4 ON transaction');
        $this->addSql('ALTER TABLE transaction DROP depot_admin_agence_id, DROP retrait_admin_agence_id');
    }
}
