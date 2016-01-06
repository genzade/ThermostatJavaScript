describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('starting temperature for thermostat', function() {
    it('defaults to 20 degrees', function() {
      expect(thermostat.currentTemp()).toEqual(20)
    });
  });

  describe('increase temperature', function() {
    it('increases temp by 1', function() {
      thermostat.upButton();
      expect(thermostat.currentTemp()).toEqual(21);
    });
  });

  describe('decrease temperature', function() {
    it('decreases temp by 1', function() {
      thermostat.downButton();
      expect(thermostat.currentTemp()).toEqual(19);
    });
  });

  describe('minimum temperature', function() {
    it('has a minimum of 10 degrees', function() {
      do {
        thermostat.downButton();
      }
      while (thermostat.degrees >= 10);
      expect(function(){ thermostat.downButton(); }).toThrowError('Temperature cannot fall below 10');
    });
  });

  describe('power saving mode', function() {
    it('defaults to on', function() {
      expect(thermostat.powerSavingStatus()).toBe(true)
    });

    describe('when on', function() {
      it('has max temperature of 25', function() {
        do {
          thermostat.upButton();
        }
        while (thermostat.degrees <= 25);
        expect(function(){ thermostat.upButton(); }).toThrowError('Temperature cannot exceed 25');
      });
    });

    describe('when off', function() {
      it('switch power saving mode', function() {
        thermostat.powerSavingSwitch();
        expect(thermostat.powerSavingStatus()).toBe(false);
      });
      it('has max temperature of 32', function() {
        thermostat.powerSavingSwitch();
        do {
          thermostat.upButton();
        }
        while (thermostat.degrees <= 32);
        expect(function(){ thermostat.upButton(); }).toThrowError('Temperature cannot exceed 32');
      });
    });
  });
});
