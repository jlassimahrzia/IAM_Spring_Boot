package talan.blockchain.demosecurity.security;

public final class SecurityConstante {
    public static final String SECRET = getSecret();
    public static final long EXPIRATION_TIME = 864_000_000;//le token expire après 10 jours de sa création
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING ="Authorization";
    private  static String getSecret() {
        String secret ="8c490d483487b3352126769354193ac16cf5e4c2499b20df8c685910680ac2c7173d58f4baa702e17fd572f484c684e405acb1a5c672be95c2ae1f4658a1d4822a3ceb22db4333f7049532757f782497b866dbaa64bf661186760da0ebf47c90b41b8b88d2a4c9a87bf77f74264f1ae896f9fb36ae001f62afec52c8f70c6a585e242ad5cadf55186474865e66728cd0b395eea04a309ce1d80bd462e6bc13bc7e6b356ee468702e159d14798bb13c6f9e2481140d068f3e8d90b0965cc6ed03e70f89b35b769724799493fe07c10f6d424a6c03ad44a7258234c716679dab91e132ba84f9720cda9c273e8d516706472e478ba06a588e523a68354b7d42f6920bd62612e0c5e41e3a52e37f4ba040a29df64733a73e075fb9e7d2435c918763591667d12b465bb773c4bc0d9f6cb691c7b223706660f17f28d78f3409851208f01e87e45bcb5a8e5da3c0af0b19ea8bd50c7dc09fa3f87154a41225799fbb77e1681c03eb607255db9d4ca671cc7d5da887d2c32808cd1e4d25a7cea6999784239b1d8830f5b773a953176cd4d811d8a3b2691365430e2c378a3704bf6cd82628f29b2852bd1ff9e3facd2127afa96714342e18525b86eac336003c503a48c317caa0d5454807d42ccd1b58465c43990a8128dfc8f332ab271e387397e6bd2491f46a4575b69806ada4f57be662b44392d2d816e2bd27656905660c441c6cc199b9cf20a3dc36cf6730e85168d38d9b09e19e6eba36f8242c5361f2c4962b43774d507901c4e5da4ad6af2dc943e0e578e1e69bb8ea5212fa6c1cc51550733528fb9cd69ea6d2179ca016179b848cf3ead11a82b9e44a2f1445f33a0e2ea81610aa4c1c66163ab983db6e522bcb7d214fd4ff0076ca18507c007098c48276e5703b91c250d300d78f1ebcbfc915c661e5c2f87d417ac2a19151567a6445ed0b570c0e223e81ffaf86ea241fbadb11a2f8b1293059a78339962bac189a9cf022c181fa5f489303d5526099db52158effe88e30c86c65e519286376e4a2ea16ce485f51c27f5985ca7dc34bb3ca4c3f89169d7990e937eaba5f7f2f380139ddb68ba02e7b242e9a2c729b9a1475fc23d65b8f9aa882a8e756a7b8b515464591f29601a105b268a4b904a8931414bb189365108795fe5a606ef58c162a5ee328845fbc123a4d3db29101766bf07b6a125a4bee44e6fcdbaac0e68369ebc011e49c42fefff1021ebea22ceb247dfe7f375a06ca804105aaa1be0f674ccfe6b12e729e36cc22b0fa7eee1741f0d5e433359b9fbb92fba5496ad29e014b265f6525bbec69ec25d05ef1558fa39c243762c3396eb43e5526bf3c0855d02d249a3a539c07a3e0ff0501f540c85e42c3107776375c34332860dd8fd2e5417ac619235c69fad5656060235606";
        /*
        SecureRandom rnd = new SecureRandom();
        rnd.setSeed(1234);
        byte[] secretByte = new byte[1000];
        rnd.nextBytes(secretByte);
        return new BigInteger(1, secretByte).toString(16);

         */
        return secret;
    }
}