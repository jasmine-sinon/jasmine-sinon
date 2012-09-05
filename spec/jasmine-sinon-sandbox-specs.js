describe("autoload sinon sandbax", function() {
	it("has a sandbox in every test", function() {
		expect(sb).toBeDefined();
	});
	
	
	describe("sandbox is cleaned up after every test", function() {
		SOME_GLOBAL_OBJECT = {
			a_function: function() {}
		}
		it("spying on a global object", function() {
			sb.spy(SOME_GLOBAL_OBJECT, 'a_function');
			
			SOME_GLOBAL_OBJECT.a_function();
			
			expect(SOME_GLOBAL_OBJECT.a_function).toHaveBeenCalledOnce();
			
		});
		
		it("spying on a global object again", function() {
			sb.spy(SOME_GLOBAL_OBJECT, 'a_function');
			
			SOME_GLOBAL_OBJECT.a_function();
			
			expect(SOME_GLOBAL_OBJECT.a_function).toHaveBeenCalledOnce();
			
		});
	})
	
});