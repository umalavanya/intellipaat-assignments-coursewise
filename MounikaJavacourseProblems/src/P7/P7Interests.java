package P7;

public class P7Interests {
	
	public static void main(String[] args) {
		
		double PrincipleAmount = 10000 ;
		double Rate = 5 ;
		double TimeInYears =  20;
		
		System.out.println("The total amount with simpe Interest: "+simpleInterestAmount(PrincipleAmount, Rate, TimeInYears));
		System.out.println("The total amount with compound Interest: "+compoundInterestAmount(PrincipleAmount, Rate, TimeInYears));
		}
	
	public static double simpleInterestAmount(double P, double R, double T) {
		double Interest = P*T*(R/100) ;
		return P+Interest ;
	}
	
	public static double compoundInterestAmount(double P, double R, double T) {
		return P*Math.pow(1+(R/100), T) ;
	
	}


}
