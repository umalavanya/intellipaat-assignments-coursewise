package P5;

import java.util.Scanner;

public class P5SquareCube {
	
	public static void main(String[] args) {
		
		Scanner scanner = new Scanner(System.in) ;
		System.out.println("Enter a number to find out square and cube of it: ");
		int num = scanner.nextInt() ;
		
		System.out.println("Square of "+num+" is :"+sqaure(num));
		System.out.println("Cube of "+num+" is :"+cube(num));
		scanner.close();
	}
	
	public static int sqaure(int a) {
		return a*a ;
	}
	
	public static int cube(int a) {
		return a*a*a ;
	}
}
