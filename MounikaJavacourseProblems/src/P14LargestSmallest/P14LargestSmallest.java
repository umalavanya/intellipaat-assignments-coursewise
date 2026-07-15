package P14LargestSmallest;

import java.util.Scanner;

public class P14LargestSmallest {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in) ; 
		System.out.println("Enter two numbers!!!3");
		int num1 = scanner.nextInt();
		int num2 = scanner.nextInt();
		
		if(num1>num2) {
			System.out.println(num1+" is the largest! and " + num2 +" is the smallest");
		} else {
			System.out.println(num2+" is the largest! and " + num1 +" is the smallest");
		}
		scanner.close() ;

	}

}
