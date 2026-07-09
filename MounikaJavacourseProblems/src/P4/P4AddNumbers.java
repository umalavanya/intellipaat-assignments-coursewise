package P4;

import java.util.Scanner;

public class P4AddNumbers {
	
	public static void main(String[] args) {
		
		Scanner scanner = new Scanner(System.in) ;
		
		System.out.println("************** Mini Arithmatic calculator *********");
		boolean toContinue = true ;
		System.out.println("Enter a number");
		int num = scanner.nextInt() ;
		scanner.next();
		double result = 0 ;
		
		System.out.println();
		
		while(toContinue) {
			
			
			System.out.println("Enter operation");
			
		}
		
		
		scanner.close();
	}
	
	
	public static int add(int a, int b) {
		return a+b ;
	}
	
	public int subtract(int a, int b) {
		return a-b ;
	}
	
	public int multiply(int a, int b) {
		return a*b ;
	}
	
	public int divide(int a, int b) {
		return (b!=0)?(a/b):-1 ;
	}
	
	public int remainder(int a, int b) {
		return (b!=0)?(a%b):-1 ;
	}
	
	public int square(int a) {
		return a*a ;
	}
	
	public int cube(int a) {
		return a*a*a ;
	}
	
	public void menu() {
		
		
	}
	
}
