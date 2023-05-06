CREATE TRIGGER [dbo].[Companies_CheckColumns] ON [dbo].[Companies]
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE(StreetName) OR UPDATE(PostalCode) OR UPDATE(City) OR UPDATE(Telephone) OR UPDATE(Cvr) OR UPDATE(LoginEmail) OR UPDATE(InvoiceEmail)
    BEGIN
        IF EXISTS (SELECT * FROM inserted WHERE StreetName IS NULL OR PostalCode IS NULL OR City IS NULL OR Telephone IS NULL OR Cvr IS NULL OR LoginEmail IS NULL OR InvoiceEmail IS NULL)
        BEGIN
            RAISERROR('All columns (except Id and CompanyName) must be provided when updating Companies.', 16, 1);
            ROLLBACK;
        END
    END
END;