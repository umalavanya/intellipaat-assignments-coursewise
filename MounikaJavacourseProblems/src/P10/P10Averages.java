package P10;

public class P10Averages {

	public static void main(String[] args) {


		double[] ary = {1,2,3,8} ;
		System.out.println(average(ary));

	}
	
	public static double average(double[] ary) {
		
		double sum = 0 ;
		
		for(double item : ary) {
			sum += item ;
		}
		
		return sum/ary.length ;
	}

}
