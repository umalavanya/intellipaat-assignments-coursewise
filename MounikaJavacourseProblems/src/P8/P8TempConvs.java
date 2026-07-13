package P8;

public class P8TempConvs {

	public static void main(String[] args) {
		
		System.out.println("Celcius to Fahreheit: "+cToF(32)+ " degree celcius");
		System.out.println("Fahrenheit to Celcius: "+fToC(38)+" degree fahrenheit");
		
	

	}
	
	public static double cToF(double c) {
		
		double f = c*(9/5)+32 ;
		return f ;
	}
	
	public static double fToC(double f) {
		double c = (f-32)*(5/9) ;
		return c ;
	}

}
