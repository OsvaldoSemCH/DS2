-- CreateTable
CREATE TABLE `Cliente` (
    `IDCliente` INTEGER NOT NULL,
    `Nome` VARCHAR(191) NOT NULL,
    `Telefone` VARCHAR(191) NOT NULL,
    `Endereco` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IDCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Servico` (
    `IDServico` INTEGER NOT NULL,
    `Preco` DOUBLE NOT NULL,

    PRIMARY KEY (`IDServico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Veiculo` (
    `IDVeiculo` INTEGER NOT NULL,
    `Marca` VARCHAR(191) NOT NULL,
    `Modelo` VARCHAR(191) NOT NULL,
    `Ano` INTEGER NOT NULL,
    `Placa` VARCHAR(191) NOT NULL,
    `IDCliente` INTEGER NOT NULL,

    PRIMARY KEY (`IDVeiculo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ordem` (
    `IDOrdem` INTEGER NOT NULL,
    `DataEntrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DataSaida` DATETIME(3) NOT NULL,
    `Status` VARCHAR(191) NOT NULL,
    `Observacao` VARCHAR(191) NOT NULL,
    `IDCliente` INTEGER NOT NULL,
    `IDVeiculo` INTEGER NOT NULL,

    PRIMARY KEY (`IDOrdem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemServico` (
    `IDItemServico` INTEGER NOT NULL,
    `Quantidade` DOUBLE NOT NULL,
    `IDOrdem` INTEGER NOT NULL,
    `IDServico` INTEGER NOT NULL,

    PRIMARY KEY (`IDItemServico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Veiculo` ADD CONSTRAINT `Veiculo_IDCliente_fkey` FOREIGN KEY (`IDCliente`) REFERENCES `Cliente`(`IDCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ordem` ADD CONSTRAINT `Ordem_IDCliente_fkey` FOREIGN KEY (`IDCliente`) REFERENCES `Cliente`(`IDCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ordem` ADD CONSTRAINT `Ordem_IDVeiculo_fkey` FOREIGN KEY (`IDVeiculo`) REFERENCES `Veiculo`(`IDVeiculo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemServico` ADD CONSTRAINT `ItemServico_IDOrdem_fkey` FOREIGN KEY (`IDOrdem`) REFERENCES `Ordem`(`IDOrdem`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemServico` ADD CONSTRAINT `ItemServico_IDServico_fkey` FOREIGN KEY (`IDServico`) REFERENCES `Servico`(`IDServico`) ON DELETE RESTRICT ON UPDATE CASCADE;
