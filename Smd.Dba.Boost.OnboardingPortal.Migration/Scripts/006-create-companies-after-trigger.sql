CREATE TRIGGER [dbo].[Companies_DeleteUsersOnCompanyDelete] ON [dbo].[Companies]
AFTER DELETE
AS
BEGIN
DELETE FROM dbo.Users WHERE CompanyId IN (SELECT Id FROM deleted)
END
