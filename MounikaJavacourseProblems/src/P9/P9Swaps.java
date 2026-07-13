package P9;

public class P9Swaps {

	public static void main(String[] args) {

        int[] result ;
		int a = 2 ;
		int b = 5 ;
		result = swapWithTemp(a,b) ;
	    System.out.println(result[0]+ " "+result[1]);
	    System.out.println(swapWithOutTemp(a,b)[0]+ " " + swapWithOutTemp(a,b)[1]);

	}
	public static int[] swapWithTemp(int a, int b) {
	
	int temp = a ;
	a = b ;
	b = temp ;
	
	return new int[] {a,b} ;
	
	}
	
	public static int[] swapWithOutTemp(int a, int b) {
		
		a = a+b ;
		b = a-b ;
		a = a-b ;
		
		return new int[] {a,b} ;
		
		}

}
