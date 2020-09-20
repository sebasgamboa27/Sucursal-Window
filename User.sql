CREATE PROCEDURE login(
   @email nvarchar(130),
   @password nvarchar(100)
)
AS
	DECLARE
	@USER_NOT_FOUND INT,
	@ENCRYPTED_PASS VARBINARY(100);
	SET @USER_NOT_FOUND = 50000;
	SET @ENCRYPTED_PASS = CAST(@password AS VARBINARY(100));

    BEGIN
	IF NOT EXISTS (SELECT * FROM [dbo].[User] as u WHERE u.email = @email and u.password = @ENCRYPTED_PASS) BEGIN
		THROW @USER_NOT_FOUND, N'User does not exist', 0
	END
    SELECT PU.PermissionId,PU.UserId,PU.PostTime,PU.Deleted,PU.ENABLED
        FROM Permission_x_User AS PU inner join [User] U ON PU.UserId = U.UserId 
        WHERE @email = U.email
End

CREATE PROCEDURE createUser(@name NVARCHAR(130), @email NVARCHAR(120), @password NVARCHAR(100)) AS DECLARE
	@ENCRYPTED_PASS VARBINARY(100);
	SET @ENCRYPTED_PASS = CAST(@password AS VARBINARY(100));
	BEGIN
	INSERT INTO [USER] VALUES(@name, @email, @ENCRYPTED_PASS, 1);
END