extern void alert(const char *msg);


int hello(const char *msg, int len) {
//int main(int argc, const char **argv) {
//    msg[msgLen - 1] = '\0';
//    for (char i = 0; i < msgLen - 1; i++) {
//        msg[i] = i;
//    }
    int a = 2;
    int b = 3;
    a++;
    int c = a + b;

    // Test JS interop
    const char *msg2 = "hello world!";
    alert(msg2);
    return c;
}

