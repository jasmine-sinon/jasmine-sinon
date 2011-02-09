describe("jasmine-sinon", function() {
  
  describe("spy matchers", function() {
    
    beforeEach(function() {
      this.spy = sinon.spy();
    });
    
    describe("called/toHaveBeenCalled matcher", function() {
      
      it("should not match when spy not called", function() {
        expect(this.spy.called).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalled();
      });
      
      it("should match when spy called once", function() {
        this.spy();
        expect(this.spy.called).toBeTruthy();
        expect(this.spy).toHaveBeenCalled();
      });
      
      it("should match when spy called twice", function() {
        this.spy();
        this.spy();
        expect(this.spy.called).toBeTruthy();
        expect(this.spy).toHaveBeenCalled();
      });
      
    });
    
    describe("calledOnce/toHaveBeenCalledOnce", function() {
      
      it("should not match when spy not called", function() {
        expect(this.spy.calledOnce).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalledOnce();
      });
      
      it("should match when spy called once", function() {
        this.spy();
        expect(this.spy.calledOnce).toBeTruthy();
        expect(this.spy).toHaveBeenCalledOnce();
      });
      
      it("should not match when spy called twice", function() {
        this.spy();
        this.spy();
        expect(this.spy.calledOnce).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalledOnce();
      });
      
    });
    
    describe("calledTwice/toHaveBeenCalledTwice", function() {
      
      it("should not match when spy not called", function() {
        expect(this.spy.calledTwice).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalledTwice();
      });
      
      it("should not match when spy called once", function() {
        this.spy();
        expect(this.spy.calledTwice).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalledTwice();
      });
      
      it("should match when spy called twice", function() {
        this.spy();
        this.spy();
        expect(this.spy.calledTwice).toBeTruthy();
        expect(this.spy).toHaveBeenCalledTwice();
      });
      
      it("should not match when spy called thrice", function() {
        this.spy();
        this.spy();
        this.spy();
        expect(this.spy.calledTwice).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalledTwice();
      });
      
    });
    
    describe("calledThrice/toHaveBeenCalledThrice", function() {
      
      it("should not match when spy not called", function() {
        expect(this.spy.calledThrice).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalledThrice();
      });
      
      it("should not match when spy called once", function() {
        this.spy();
        expect(this.spy.calledThrice).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalledThrice();
      });
      
      it("should not match when spy called twice", function() {
        this.spy();
        this.spy();
        expect(this.spy.calledThrice).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalledThrice();
      });
      
      it("should match when spy called thrice", function() {
        this.spy();
        this.spy();
        this.spy();
        expect(this.spy.calledThrice).toBeTruthy();
        expect(this.spy).toHaveBeenCalledThrice();
      });
      
      it("should not match when spy called four times", function() {
        this.spy();
        this.spy();
        this.spy();
        this.spy();
        expect(this.spy.calledThrice).toBeFalsy();
        expect(this.spy).not.toHaveBeenCalledThrice();
      });
      
    });
    
    describe("calledBefore/toHaveBeenCalledBefore", function() {
      
      beforeEach(function() {
        this.spyA = sinon.spy();
        this.spyB = sinon.spy();
      });
      
      it("should match when spy a called before spy b", function() {
        this.spyA();
        this.spyB();
        expect(this.spyA.calledBefore(this.spyB)).toBeTruthy();
        expect(this.spyA).toHaveBeenCalledBefore(this.spyB);
      });
      
      it("should not match when spy a called after spy b", function() {
        this.spyB();
        this.spyA();
        expect(this.spyA.calledBefore(this.spyB)).toBeFalsy();
        expect(this.spyA).not.toHaveBeenCalledBefore(this.spyB);
      });
      
    });
    
  });
  
});