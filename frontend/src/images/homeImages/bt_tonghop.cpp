#include <iostream>
#include <vector>
using namespace std;

void inputArray(vector<int> &arr)
{
    int n;
    cout << "\nNhap so luong: ";
    cin >> n;

    for (int i = 0; i < n; i++)
    {
        int tmp;
        cout << "Nhap phan tu thu " << i + 1 << " : ";
        cin >> tmp;
        arr.push_back(tmp);
    }
}

void displayArray(vector<int> arr)
{
    cout << "{";
    for (int i = 0; i < arr.size(); i++)
    {
        cout << arr.at(i);
        if (i != arr.size() - 1)
            cout << ", ";
    }
    cout << "}" << endl;
}

vector<int> cardinality(vector<int> a) // luc luong
{
    vector<int> b;
    for (int i = 0; i < a.size(); i++)
    {
        int tmp = 1;
        for (int j = 0; j < i; j++)
        {
            if (a.at(i) == a.at(j))
                tmp = 0;
        }
        if (tmp == 1)
            b.push_back(a.at(i));
    }

    return b;
}

vector<int> unionTwoArray(vector<int> A, vector<int> B) // hop 2 tap hop
{
    vector<int> C;
    int i = 0, j = 0;
    while (i < A.size() && j < B.size())
    {
        C.push_back(A.at(i));
        C.push_back(B.at(j));

        if (i == A.size() - 1)
        {
            j++;
        }
        else if (j == B.size() - 1)
        {
            i++;
        }
        else
        {
            i++;
            j++;
        }
    }

    return cardinality(C);
}

void displayCartesianProduct(vector<int> A, vector<int> B) // hien thi tich descarter
{
    cout << "{";
    for (int i = 0; i < A.size(); i++)
    {
        for (int j = 0; j < B.size(); j++)
        {
            cout << "(" << A.at(i) << ", " << B.at(j) << ")";
            if (i == A.size() - 1 && j == B.size() - 1)
                continue;
            cout << ", ";
        }
    }
    cout << "}";
}

int main()
{
    vector<int> A, B, C;
    cout << "Nhap tap hop so nguyen A: ";
    inputArray(A);

    cout << "Nhap tap hop so nguyen B: ";
    inputArray(B);

    cout << "Nhap tap hop so nguyen C: ";
    inputArray(C);

    cout << "A = ";
    displayArray(A);
    cout << "B = ";
    displayArray(B);
    cout << "C = ";
    displayArray(C);

    cout << "(A hop B hop C) x B = ";
    displayCartesianProduct(unionTwoArray(unionTwoArray(A, B), C), B);

    return 0;
}
