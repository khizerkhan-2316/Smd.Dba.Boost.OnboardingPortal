CREATE TRIGGER [dbo].[trg_Users_CheckRoleAndCompany] ON [dbo].[Users]
AFTER INSERT, UPDATE
                                 AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted i JOIN [dbo].[Roles] r ON i.[RoleId] = r.[Id] WHERE r.[Role] = 'User' AND i.[CompanyId] IS NULL)
BEGIN
        RAISERROR ('Cannot insert or update the row. CompanyId required when associating a user.', 16, 1)
        ROLLBACK TRANSACTION
        RETURN
END
END
