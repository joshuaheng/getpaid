SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `heng3_GetPaid` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `heng3_GetPaid` ;

-- -----------------------------------------------------
-- Table `GetPaid`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heng3_GetPaid`.`User` ;

CREATE TABLE IF NOT EXISTS `heng3_GetPaid`.`User` (
  `userId` VARCHAR(32) NOT NULL,
  `email` VARCHAR(32) NULL,
  `password` VARCHAR(32) NULL,
  PRIMARY KEY (`userId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GetPaid`.`Reciept`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heng3_GetPaid`.`Reciept` ;

CREATE TABLE IF NOT EXISTS `heng3_GetPaid`.`Reciept` (
  `recieptId` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(45) NOT NULL,
  `total` DOUBLE NULL DEFAULT 0,
  `shared` TINYINT(1) NOT NULL DEFAULT FALSE,
  `date` DATE NULL,
  `storeName` VARCHAR(45) NULL,
  PRIMARY KEY (`recieptId`),
  UNIQUE INDEX `recieptId_UNIQUE` (`recieptId` ASC),
  INDEX `userId_idx` (`userId` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `heng3_GetPaid`.`User` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GetPaid`.`Payers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heng3_GetPaid`.`Payers` ;

CREATE TABLE IF NOT EXISTS `heng3_GetPaid`.`Payers` (
  `recieptId` INT NOT NULL,
  `payerNumber` INT NOT NULL,
  `email` VARCHAR(45) NULL,
  `phoneNumber` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`recieptId`, `payerNumber`),
  CONSTRAINT `recieptId`
    FOREIGN KEY (`recieptId`)
    REFERENCES `heng3_GetPaid`.`Reciept` (`recieptId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GetPaid`.`Item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `heng3_GetPaid`.`Item` ;

CREATE TABLE IF NOT EXISTS `heng3_GetPaid`.`Item` (
  `name` VARCHAR(45) NULL,
  `recieptId` INT NULL,
  `itemId` INT NOT NULL AUTO_INCREMENT,
  `numberOfItems` INT NULL,
  `cost` DOUBLE NULL,
  `payerNumber` INT NULL DEFAULT 0,
  PRIMARY KEY (`itemId`),
  INDEX `recieptId_idx` (`recieptId` ASC),
  INDEX `payerNumber_idx` (`payerNumber` ASC),
  CONSTRAINT `recieptId`
    FOREIGN KEY (`recieptId`)
    REFERENCES `heng3_GetPaid`.`Reciept` (`recieptId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `payerNumber`
    FOREIGN KEY (`payerNumber`)
    REFERENCES `GetPaid`.`Payers` (`payerNumber`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `GetPaid`.`User`
-- -----------------------------------------------------
START TRANSACTION;
USE `heng3_GetPaid`;
INSERT INTO `heng3_GetPaid`.`User` (`userId`, `email`, `password`) VALUES ('Shouvik', 'shouvik.sayef@gmail.com', 'password123');
INSERT INTO `heng3_GetPaid`.`User` (`userId`, `email`, `password`) VALUES ('Joshua', 'heng3@illinois.edu', 'password123');
INSERT INTO `heng3_GetPaid`.`User` (`userId`, `email`, `password`) VALUES ('Shuotian', 'schen79@illinois.edu', 'password123');
INSERT INTO `heng3_GetPaid`.`User` (`userId`, `email`, `password`) VALUES ('Joseph', 'jtmilla2@illinois.edu', 'password123');
INSERT INTO `heng3_GetPaid`.`User` (`userId`, `email`, `password`) VALUES ('user1', 'user1@example.com', 'password123');

COMMIT;


-- -----------------------------------------------------
-- Data for table `GetPaid`.`Reciept`
-- -----------------------------------------------------
START TRANSACTION;
USE `heng3_GetPaid`;
INSERT INTO `heng3_GetPaid`.`Reciept` (`recieptId`, `userId`, `total`, `shared`, `date`, `storeName`) VALUES (1, 'Shouvik', 27.00, TRUE, '10/16/2013', 'PizzaHut');

COMMIT;


-- -----------------------------------------------------
-- Data for table `GetPaid`.`Item`
-- -----------------------------------------------------
START TRANSACTION;
USE `heng3_GetPaid`;
INSERT INTO `heng3_GetPaid`.`Item` (`name`, `recieptId`, `itemId`, `numberOfItems`, `cost`, `payerNumber`) VALUES ('Cheese Pizza', 1, 1, 1, 8.00, 0);
INSERT INTO `heng3_GetPaid`.`Item` (`name`, `recieptId`, `itemId`, `numberOfItems`, `cost`, `payerNumber`) VALUES ('Peperoni Pizza', 1, 2, 1, 9.00, 1);
INSERT INTO `heng3_GetPaid`.`Item` (`name`, `recieptId`, `itemId`, `numberOfItems`, `cost`, `payerNumber`) VALUES ('Sausage Pizza', 1, 3, 1, 10.00, 2);

COMMIT;

