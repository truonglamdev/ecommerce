#include<iostream>

using namespace std;
const int MAX_SIZE_ARRAY =100;
int main () {
	int A[MAX_SIZE_ARRAY], B[MAX_SIZE_ARRAY],C[MAX_SIZE_ARRAY] ;
	int m,n,p , k=0;
	
	cout<<"Nhap so phan tu cua tap hop A : ";
		cin>>m;
		for(int i = 0 ; i < m ; i++) {
			cout<<"\nNhap phan tu thu " << i+ 1 <<" : ";
			cin>>A[i]; 
		}
		
		cout<<"Nhap so phan tu cua tap hop B : ";
		cin>>n;
		for(int i = 0 ; i<n ; i++) {
			cout<<"\nNhap phan tu thu " << i+ 1 <<" : ";
			cin>>B[i];
		}
		
		cout<<"Nhap so phan tu cua tap hop C : ";
		cin>>p;
		for(int i = 0 ; i<p ; i++) {
			cout<<"\nNhap phan tu thu " << i+ 1 <<" : ";
			cin>>C[i];
		}
		
		
		 int result[m + n + p] = {0};
		
		for(int i = 0; i<m;i++) {
			result[i] = A[i];
		}
		
		for(int i = 0; i<n ; i++) {
			bool check = false;
			for(int j = 0; j < m + i ; j++) {
				if(result[j] == B[i]) {
					check = true;
					break;
				}
			}
			
			if(!check) {
				result[m + i] = B[i];
			}
		}
		
		for(int i = 0; i < p; i++) {
			bool check = false;
			for(int j = 0;  j< m + n + i ; j ++) {
				if(result[j] == C[i]) {
					check = true;
					break;
				}
			}
			
			if(!check) {
				result[m + n + i] = C[i];
			}
		}
		
		cout << "A hop B hop C: ";
	    for (int i = 0; i < m + n + p; i++)
	    {
	        if (result[i] != 0)
	        {
	            cout << result[i] << " ";
	        }
	    }
	    
	    cout<<"(A hop B hop C) x B = ";
	    for(int i = 1 ; i < m + n + p; i++){
			for(int j = 0; j< n) {
				cout<<"( "<<result[i]<<" , "<<B[j]<<" ) ,";
			}
		}
    
    
}
