create database Sucursales

use Sucursales

-- --------------------------------------------La parte de rodri
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rep_Addresses](
	[AddressId] [bigint] Identity(1, 1) NOT NULL,
	[Details1] [nvarchar](130) NOT NULL,
	[Details2] [nvarchar](130) NULL,
	[ZipCode] [varchar](10) NOT NULL,
	[Location] [geography] NULL,
	[CityId] [int] NOT NULL,
	[PostTime] [datetime] NOT NULL,
	[Enabled] [bit] NOT NULL,
 CONSTRAINT [PK_Rep_Addresses] PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
))
GO
/****** Object:  Table [dbo].[Rep_Cities]    Script Date: 9/10/2020 10:37:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rep_Cities](
	[CityId] [int] Identity(1, 1) NOT NULL,
	[CityName] [varchar](60) NOT NULL,
	[StateId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rep_Countries]    Script Date: 9/10/2020 10:37:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rep_Countries](
	[CountryId] [int] Identity(1, 1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[CountryCode] [char](5) NOT NULL,
 CONSTRAINT [PK_Rep_Countries] PRIMARY KEY CLUSTERED 
(
	[CountryId] ASC
))
GO
/****** Object:  Table [dbo].[Rep_States]    Script Date: 9/10/2020 10:37:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rep_States](
	[StateId] [int] Identity(1, 1) NOT NULL,
	[StateName] [varchar](80) NOT NULL,
	[CountryId] [int] NOT NULL,
 CONSTRAINT [PK_Rep_States] PRIMARY KEY CLUSTERED 
(
	[StateId] ASC
))
GO
/****** Object:  Table [dbo].[Rep_Sucursal]    Script Date: 9/10/2020 10:37:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rep_Sucursal](
	[SucursalId] [int] Identity(1, 1) NOT NULL,
	[Name] [varchar](120) NOT NULL,
	[Phone] [varchar](12) NOT NULL,
	[Email] [varchar](120) NOT NULL,
	[AddressId] [bigint] NOT NULL,
	[Enabled] [bit] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Rep_Addresses] ADD  CONSTRAINT [DF_Rep_Addresses_PostTime]  DEFAULT (getdate()) FOR [PostTime]
GO
ALTER TABLE [dbo].[Rep_Addresses] ADD  CONSTRAINT [DF_Rep_Addresses_Enabled]  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [dbo].[Rep_Sucursal] ADD  CONSTRAINT [DF_Rep_Sucursal_Enabled]  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [dbo].[Rep_Cities]  WITH CHECK ADD  CONSTRAINT [FK_Rep_Cities_Rep_States] FOREIGN KEY([StateId])
REFERENCES [dbo].[Rep_States] ([StateId])
GO
ALTER TABLE [dbo].[Rep_Cities] CHECK CONSTRAINT [FK_Rep_Cities_Rep_States]
GO
ALTER TABLE [dbo].[Rep_States]  WITH CHECK ADD  CONSTRAINT [FK_Rep_States_Rep_Countries] FOREIGN KEY([CountryId])
REFERENCES [dbo].[Rep_Countries] ([CountryId])
GO
ALTER TABLE [dbo].[Rep_States] CHECK CONSTRAINT [FK_Rep_States_Rep_Countries]
GO
ALTER TABLE [dbo].[Rep_Sucursal]  WITH CHECK ADD  CONSTRAINT [FK_Rep_Sucursal_Rep_Addresses] FOREIGN KEY([AddressId])
REFERENCES [dbo].[Rep_Addresses] ([AddressId])
GO
ALTER TABLE [dbo].[Rep_Sucursal] CHECK CONSTRAINT [FK_Rep_Sucursal_Rep_Addresses]
GO
/****** Object:  StoredProcedure [dbo].[repsp_registrarSucursal]    Script Date: 9/10/2020 10:37:40 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- --------------------------------------------La parte de rodri




--Tabla Rol
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Role](
	[RoleId] [bigint] NOT NULL IDENTITY(1,1),
	[name] [nvarchar](130) NOT NULL,
	[Enabled] [bit] NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
))
--Tabla Permiso

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Permission](
	[PermissionId] [bigint] NOT NULL IDENTITY(1,1),
	[Description] [nvarchar](130) NOT NULL,
	[Code] [int] NOT NULL,
	[Type] [bigint] NOT NULL, -- agregar el FK con la categoria permiso
	[Enabled] [bit] NOT NULL,
 CONSTRAINT [PK_Persmission] PRIMARY KEY CLUSTERED 
(
	[PermissionId] ASC
)
)


-- Tabla Categor�as de permiso

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Permission_Categories](
	[CategoryId] [bigint] NOT NULL IDENTITY(1,1),
	[Description] [nvarchar](130) NOT NULL,
	[Enabled] [bit] NOT NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)
)

--Tabla usuario
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [User](
	[UserId] [bigint] NOT NULL IDENTITY(1,1),
	[name] [nvarchar](130) NOT NULL,
	[email] [nvarchar](120) UNIQUE NOT NULL,
	[password] [varbinary](100) NOT NULL,
	--Sucursal
	[Enabled] [bit] NOT NULL,
 CONSTRAINT [PK_UserId] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)
)

-- Tabla usuarios por rol

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Usuarios_x_Role](
	[UxRId] [bigint] NOT NULL IDENTITY(1,1),
	[RoleId] [bigint] NOT NULL,
	[UserId] [bigint] NOT NULL,
	[PostTime] [datetime] NOT NULL,
	[Deleted] [datetime] NOT NULL, 
	[Enabled] [bit] NOT NULL,
 CONSTRAINT [PK_User_x_Role] PRIMARY KEY CLUSTERED 
(
	[UxRId] ASC
)
)
-- Tabla Permiso por usuario

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Permission_x_User](
	[PxUId] [bigint] NOT NULL IDENTITY(1,1),
	[PermissionId] [bigint] NOT NULL,
	[UserId] [bigint] NOT NULL,
	[PostTime] [datetime] NOT NULL, 
	[Deleted] [datetime] NOT NULL, 
	[Enabled] [bit] NOT NULL,
 CONSTRAINT [PK_Permission_x_User] PRIMARY KEY CLUSTERED 
(
	[PxUId] ASC
)
)
-- Tabla permiso x rol

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [PermissionxRole](
	[PxRId] [bigint] NOT NULL IDENTITY(1,1),
	[RoleId] [bigint] NOT NULL,
	[PermissionId] [bigint] NOT NULL,
	[PostTime] [datetime] NOT NULL, 
	[Deleted] [datetime] NOT NULL, 
	[checkSum] [varbinary] NOT NULL,
 CONSTRAINT [PK_PermissionxRole] PRIMARY KEY CLUSTERED 
(
	[PxRId] ASC
))


GO
ALTER TABLE [PermissionxRole] ADD  CONSTRAINT [DF_PermissionxRole_PostTime]  DEFAULT (getdate()) FOR [PostTime]
GO
ALTER TABLE [Permission_x_User] ADD  CONSTRAINT [DF_Permission_x_User_PostTime]  DEFAULT (getdate()) FOR [PostTime]
GO
ALTER TABLE [Usuarios_x_Role] ADD  CONSTRAINT [DF_Usuarios_x_Role_PostTime]  DEFAULT (getdate()) FOR [PostTime]

GO
ALTER TABLE [Permission_x_User] ADD  CONSTRAINT [DF_Permission_x_User_Enabled]  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [Usuarios_x_Role] ADD  CONSTRAINT [DF_Usuarios_x_Role_Enabled]  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [User] ADD  CONSTRAINT [DF_User_Enabled]  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [Permission_Categories] ADD  CONSTRAINT [DF_Permission_Categories_Enabled]  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [Permission] ADD  CONSTRAINT [DF_Permission_Enabled]  DEFAULT ((1)) FOR [Enabled]
GO
ALTER TABLE [Role] ADD  CONSTRAINT [DF_Role_Enabled]  DEFAULT ((1)) FOR [Enabled]


ALTER TABLE [PermissionxRole]  WITH CHECK ADD  CONSTRAINT [FK_Role_Permission] FOREIGN KEY([RoleId])
REFERENCES [Role] ([RoleId])
GO
ALTER TABLE [PermissionxRole] CHECK CONSTRAINT [FK_Role_Permission]
GO

ALTER TABLE [PermissionxRole]  WITH CHECK ADD  CONSTRAINT [FK_Permission_Role] FOREIGN KEY([PermissionId])
REFERENCES [Permission] ([PermissionId])
GO
ALTER TABLE [PermissionxRole] CHECK CONSTRAINT [FK_Permission_Role]
GO

ALTER TABLE [Permission_x_User]  WITH CHECK ADD  CONSTRAINT [FK_Permission_User] FOREIGN KEY([PermissionId])
REFERENCES [Permission] ([PermissionId])
GO
ALTER TABLE [Permission_x_User] CHECK CONSTRAINT [FK_Permission_User]
GO

ALTER TABLE [Permission_x_User]  WITH CHECK ADD  CONSTRAINT [FK_User_Permission] FOREIGN KEY([UserId])
REFERENCES [User] ([UserId])
GO
ALTER TABLE [Permission_x_User] CHECK CONSTRAINT [FK_User_Permission]
GO

ALTER TABLE [Usuarios_x_Role]  WITH CHECK ADD  CONSTRAINT [FK_User_Role] FOREIGN KEY([UserId])
REFERENCES [User] ([UserId])
GO
ALTER TABLE [Usuarios_x_Role] CHECK CONSTRAINT [FK_User_Role]
GO

ALTER TABLE [Usuarios_x_Role]  WITH CHECK ADD  CONSTRAINT [FK_Role_User] FOREIGN KEY([RoleId])
REFERENCES [Role] ([RoleId])
GO
ALTER TABLE [Usuarios_x_Role] CHECK CONSTRAINT [FK_Role_User]
GO