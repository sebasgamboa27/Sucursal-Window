USE Sucursales;
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[repsp_registrarSucursal] 
	@name VARCHAR(120),
	@email VARCHAR(120),
	@phoneNumber VARCHAR(12),
	@City NVARCHAR(60),
	@State VARCHAR(80),
	@Country NVARCHAR(50),
	@Address1 VARCHAR(120) = NULL,
	@Address2 VARCHAR(120) = NULL,
	@lat DECIMAL(20, 16),
	@long DECIMAL(20, 16),
	@zipcode VARCHAR(10)
AS
BEGIN
	DECLARE 
	@stateId INT,
	@countryId INT,
	@cityId INT,
	@spatialLocation GEOGRAPHY,
	@idSucursal INT,
	@INVALID_ZIPCODE INT,
	@INVALID_COUNTRY INT,
	@UNABLE_TO_ADD_STORE INT;
	SET @UNABLE_TO_ADD_STORE = 50002;
	SET @INVALID_COUNTRY = 50001;
	SET @INVALID_ZIPCODE = 50000;
	SET NOCOUNT ON;
	/*Check if country does not exists*/
	IF NOT EXISTS (SELECT * FROM Rep_Countries WHERE Rep_Countries.Name = @Country) BEGIN
		THROW @INVALID_COUNTRY, N'Country does not exist', 0
	END

	SELECT @countryId=Rep_Countries.CountryId FROM Rep_Countries WHERE Rep_Countries.Name = @Country

	/*Check if state does not exists*/
	IF NOT EXISTS (SELECT * FROM Rep_Countries inner join Rep_States ON Rep_Countries.CountryId = Rep_States.StateId
	WHERE Rep_Countries.Name = @Country AND Rep_States.StateName = @State) BEGIN
		INSERT INTO Rep_States values(@State, @countryId)
	END

	SELECT @stateId=Rep_States.StateId FROM Rep_States WHERE StateName = @State

	/*Check if city does not exists*/
	IF NOT EXISTS (SELECT * FROM Rep_States inner join Rep_Cities ON Rep_States.StateId = Rep_Cities.CityId
	WHERE Rep_States.StateName = @State AND Rep_Cities.CityName = @City) BEGIN
		INSERT INTO Rep_Cities values(@City, @stateId)
	END

	SELECT @cityId=Rep_Cities.CityId FROM Rep_Cities WHERE CityName = @City

	IF @lat IS NOT NULL AND @long IS NOT NULL BEGIN
		SET @spatialLocation = GEOGRAPHY::Point(@lat, @long, 4326)
	END

	IF @zipcode IS NULL BEGIN
		THROW @INVALID_ZIPCODE, 'Zipcode must not be null', 0
	END

	BEGIN TRY
		BEGIN TRANSACTION
			SET TRANSACTION ISOLATION LEVEL READ COMMITTED
			INSERT INTO Rep_Addresses VALUES(@Address1, @Address2, @zipcode, @spatialLocation, @cityId, GETDATE(), 1);
			SET @idSucursal = SCOPE_IDENTITY();
			INSERT INTO Rep_Sucursal VALUES(@name, @phoneNumber, @email, @idSucursal, 1);
			COMMIT;
	END TRY

	BEGIN CATCH
		ROLLBACK;
		THROW @UNABLE_TO_ADD_STORE, 'Unable to add store', 0
	END CATCH

END

EXEC repsp_registrarSucursal
	@name = 'Test',
	@email = 'test@test.com',
	@phoneNumber = '+50600000000',
	@City = 'Cartago',
	@State = 'Cartago',
	@Country = 'Costa Rica',
	@Address1 = '50 mts este super x',
	@Address2 = '100 mts oeste hospital y',
	@lat = 9.32132032,
	@long = -8.165161,
	@zipcode = '31225';
