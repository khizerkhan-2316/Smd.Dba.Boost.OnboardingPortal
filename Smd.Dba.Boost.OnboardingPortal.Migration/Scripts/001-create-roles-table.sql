IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Roles]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Roles]
        (
        [Id] [UNIQUEIDENTIFIER] NOT NULL PRIMARY KEY,
        [Role] NVARCHAR(50) NOT NULL UNIQUE
        )

    INSERT INTO [dbo].[Roles] ([Id], [Role]) 
        VALUES
        ('87E99D61-6F0C-4E1C-91E9-90D0C13DCDBF', 'Admin'),
        ('3D75B14F-3584-4D72-9E1C-7259C726B826', 'User')
END
