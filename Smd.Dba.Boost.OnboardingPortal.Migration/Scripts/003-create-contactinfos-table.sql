IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ContactInfos]') AND type in (N'U'))
BEGIN

CREATE TABLE [dbo].[ContactInfos](
    [Id] [UNIQUEIDENTIFIER] NOT NULL PRIMARY KEY,
    [StreetName] NVARCHAR(50) NOT NULL,
    [PostalCode] NVARCHAR(10) NOT NULL,
    [City] NVARCHAR(50) NOT NULL,
    [Telephone] NVARCHAR(8) NOT NULL,
    [UserId] [UNIQUEIDENTIFIER] NOT NULL,
    CONSTRAINT [FK_ContactInfos_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]) ON DELETE CASCADE
    )
END