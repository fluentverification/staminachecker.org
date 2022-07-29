let pages = [ 
{
title:"Home - STAMINA Model Checker"
, date:"Thu Jul 28 13:48:07 2022"
, url:"https://staminachecker.org/index.html"
, content:"A state-space truncation tool that can analyze infinite-sized models.Download Latest Release (2.2.5)Get Source CodeSTAMINA: STochastic Approximate Model-checker for INfinite-state Analysis. STAMINA can analyze unbounded and infinite-sized models, as well as models with very large state spaces, and provide an accurate bound of probabilities for CSL properties. It has been tested on genetic circuit and biological models, and has been the subject of multiple papers. Learn MoreAcknowledgementsThe development of STAMINA (and all FLUENT projects) is generously funded by grants 1856733, 1856740, and 1900542 from the National Science Foundation. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the author(s) and do not necessarily reflect the views of the National Science Foundation. STAMINA is developed at the Utah State University College of Engineering, in the Electrical and Computer Engineering Department.STAMINA InformationFLUENT InformationPapers and ResearchSTAMINA/STORMState-space truncation "
}
, {
title:"Get Source Code - STAMINA Model Checker"
, date:"Thu Jul 28 14:24:14 2022"
, url:"https://staminachecker.org/source.html"
, content:"Get Source Code - STAMINA Model CheckerWhich version of STAMINA do you want?STAMINA/STORMSTAMINA/PRISMPlease note that both of these links are external. They will take you to our GitHub pages.To get STAMINA/STORM, please clone the following GitHub URL:git clone https://github.com/fluentverification/stamina-cplusplus stamina-stormTo get STAMINA/PRISM, please clone the following GitHub URL:git clone https://github.com/fluentverification/stamina stamina-prismSTAMINA/STORM is the newest version of STAMINA, integrating with the STORM model checker. It supports the STAMINA 2.0, 2.5, and will soon support 3.0 and multithreading.STAMINA/PRISM is the legacy version of STAMINA, integrating with the PRISM model checker. It is written in Java and supports the STAMINA 1.0 and 2.0 algorithms.Go BackGo to Homepage"
}
, {
title:"Home - STAMINA Model Checker"
, date:"Thu Jul 28 13:51:48 2022"
, url:"https://staminachecker.org/privacy.html"
, content:"Home - The STAMINA Website saves only one cookie on your browser with the purpose of remembering whether you prefer dark or light mode. Naturally, we do not track you, store excessive cookies, advertise on this site, or anything of the sort. That would be extremely unprofessional of us. You will not see this message on future visits.Privacy PolicyWe don't store any data about you, track you, or include any cross-site trackers. We do include fonts from the Google font API and use Kwes as our form backend on the about page, and although we tried to choose these services such that they will respect your privacy as well, we can't guarantee that they aren't tracking you either.Additionally, this website is hosted on GitHub Pages, which has a privacy policy that can be accessed here. Again, since this is a third-party service, we cannot guarantee that they aren't tracking you. Because we care about your online privacy, we'd like to include some tips for online privacy that you can use.We also use the Google Custom Search engine to allow for searching across this website. Please view their privacy policy here.Tips for Online PrivacyThe following are Josh's tips for online privacy:Use an open-source privacy respecting web browser, such as Firefox, Librewolf (an open source fork of Firefox without the telemetry!), or Ungoogled Chromium. Even a browser such as Midori or Falkon that are included with smaller Linux distributions are more private than mainstream browsers like Chrome or Edge.Configure your browser to erase cookies and cache data periodically. (I do it on browser exit).Install uBlock Origin. Seriously. This thing is S-tier. I personally use it to disable scripting on all sites except for sites which I whitelist.Check your browser's fingerprint on EFF's Cover Your Tracks website. EFF is an interest group that fights for online privacy. Your browser will probably have a unique fingerprint, but virtually all modern browsers do.To see what types of cookies a website is storing about you, open up your JavaScript console, and enter document.cookie into the console. The cookie element is a string that is space-delimited and contains values in the format name=value. For this site, your cookie will look something like this: \"color-scheme=dark expires=Fri, 16 Jun 2023 23:02:44 GMT\" STAMINA InformationFLUENT InformationPapers and ResearchSTAMINA/STORMState-space truncation "
}
, {
title:"About - STAMINA Model Checker"
, date:"Thu Jul 28 13:50:16 2022"
, url:"https://staminachecker.org/about.html"
, content:"About - About STAMINA STAMINA is designed to work with large or infinite state space models and truncate them so that the probability of a CSL path property holding given an initial state is bounded within a window. It is developed within Dr. Zhen Zhang's research group at Utah State University and maintained by the following people:Current Maintainer:Josh Jeppson, B.Sc.PhD Student - Utah State UniversityEmail: [Click To See Email]Past Maintainers and Code Contributors:Riley RobertsAndrew WilliamsBret JepsenThakur NeupaneLukas BuecherlIntroduction to STAMINASTAMINA is an infinite state-space model truncation tool compatible with both PRISM and STORM. STAMINA is a tool within the FLUENT toolchain. It deploys a state truncation-based approach, estimating path probabilities of reaching each state on-the-fly and terminates exploration of a path when the cumulative estimated probability along such a path drops below a predefined threshold. Each terminated path is routed to an absorbing state, in order to estimate the error probability in subsequent CTMC analysis.After all paths have been explored or truncated, transient Markov chain analysis is applied to determine the probability of a transient property of interest specified using Continuous Stochastic Logic (CSL). The calculated probability forms a lower bound on the probability, while the upper bound also includes the probability of the absorbing state. The actual probability of the CSL property is guaranteed to be within this range. If the probability bound is still too large compared to a user-provided probability precision value (default is 10-3), the PRISM version of STAMINA employs a property property-guided refinement technique to expand the state space to tighten the reported probability range incrementally.Frequently Asked QuestionsWhat model checking engines does STAMINA support?STAMINA supports the STORM and PRISM model checking engines, and it supports models written in the PRISM language. Future work includes making STAMINA compatible with JANI and other model formats.What types of models does STAMINA support?Currently, STAMINA/PRISM supports only CTMCs, whereas STAMINA/STORM supports both CTMCs, and has alpha support for DTMCs through the STORM API.Why would we want to check an infinite (or very large) model?STAMINA was developed primarily to check models representative of chemical reaction networks in synthetic biology. Because each combination of molecules is a state, even a bounded reaction network could have an infinite or extremely large number of states, making the resulting model non-trivial for a traditional model checker such as STORM or PRISM. In order to actually extract useful information from these models, and to test them against CSL properties, STAMINA was developed.The STAMINA Algorithm(s)STAMINA makes use of multiple variations on a smart breadth-first search algorithm to estimate reachability probability on-the-fly. It does not explore paths whose reachability is below a certain user-defined threshold, κ, which automatically decrements until the probability window is within a certain bound. Currently there are several variations on the STAMINA algorithm.The STAMINA 1.0 AlgorithmSTAMINA 1.0 was originally developed by several students under Dr Zhen Zhang, including Thakur Neupane. The basic idea of the algorithm is that for each iteration of κ, states are only explored if an estimated reachability value (based somewhat on the embedded DTMC). While the probability estimate window is too wide, κ is progressively reduced and state exploration is continued. The problem with this was that as κ was reduced, we had no way to continue exploring states we had already truncated in previous iterations.The STAMINA 2.0/2.1 AlgorithmSTAMINA 2.0 is the naïve approach to fixing the problem presented in STAMINA 1.0: simply re-explore the entire state space with the current value of κ. The logic regarding performance is that model checking with PRISM was the bottleneck in the algorithm, whereas the state exploration was extremely fast, likely because the PRISM model checker spent far more time checking rather than building the model. However, when this was implemented in C++ to interface with the STORM model checker, precisely the opposite was found: that the model building and truncating were the bottleneck.However, the entirety of STAMINA 2.0 was far from naïve. STAMINA 2.0 introduced a new means of keeping track of state reachability, solving another problem in STAMINA 1.0: when a state had been explored, its reachability probability was zeroed out, allowing state re-exploration, and multiple paths to a state to contribute to a state's estimated reachability. This novelty earned it a spot in VMCAI'22.Dynamic Programming Improvements (STAMINA 2.5)In order to make STAMINA/STORM faster, in addition to memory pooling and decreased use of std::unordered_map and std::unordered_set (which after much testing, were determined to be far slower than the Java equivalent), certain dynamic programming improvements were devised to the STAMINA 2.0 algorithm. Please note that these are implemented exclusively in the STORM integration. The improvements simply keep track of the reachability that would have been lost in previous iterations and enqueue \"lost\" states to be explored alongside terminal states of the last iteration, rather than either the initial state (STAMINA 2.0) or the previous terminal states (STAMINA 1.0).Another major novel improvement slated to be released with STAMINA 2.5 is the use of multi-threading, and a custom protocol for the control thread to grant access without having to store mutual-exclusions for every state (extremely memory intensive), or having to lock all or part of the state space every time a thread requests control of a state (reduces the improvement of multithreading). This new protocol is among the improvements we are looking to include in a paper this fall.The STAMINA 3.0 AlgorithmSTAMINA 3.0 (not yet released) reduces complexity of the algorithm further. Rather than using κ and rκ to conditionally truncate states, all states, as they are explored, are inserted into a priority queue on the value π[s], the estimated reachability of that state. States are explored in order of their estimated reachability. If a current state transitions into a state that is already enqueued, we do not force the queue to re-order until that state is dequeued and explored.The STAMINA Heuristic AlgorithmThe STAMINA Heuristic algorithm has not yet been implemented nor tested but would provide an alternate means of termination rather than estimated terminal reachability.Contact the Developers of STAMINAFull Name:Organization:Email:Position:Organization Type:AcademicResearchIndustrySubjectSTAMINA InformationFLUENT InformationPapers and ResearchSTAMINA/STORMState-space truncation "
}
, {
title:"Get - STAMINA Model Checker"
, date:"Thu Jul 28 13:51:37 2022"
, url:"https://staminachecker.org/get.html"
, content:"Get - Get STAMINAOfficial ReleasesDownload Latest Release (2.2.5)Other ReleasesSTAMINA/STORM 2.2.1STAMINA/STORM Version 0.1 alpha (non-optimized)Version 2.0 (Only PRISM Integration)Version 1.1 (Only PRISM Integration)Source CodeSTAMINA is separated into three repositories: the main STAMINA repository, and two repositories included as submodules: STAMINA/STORM and STAMINA/PRISM. All three are hosted on GitHub. Get Source Code (Main Repository)RepositoriesMain RepositorySTAMINA/STORMSTAMINA/PRISMCiting StaminaTo cite STAMINA in papers, use one of the following citations:To cite STAMINA 2.0, please use the tool paper from VMCAI'22:Roberts R., Neupane T., Buecherl L., Myers C.J., Zhang Z. (2022) STAMINA 2.0: Improving Scalability of Infinite-State Stochastic Model Checking. In: Bernd F., Wies, T. (eds) Verification, Model Checking, and Abstract Interpretation. VMCAI 2022. Lecture Notes in Computer Science, Springer, Cham. Download link: https://link.springer.com/chapter/10.1007/978-3-030-94583-1_16Copy CitationTo cite STAMINA 1.0, please use the tool paper from CAV'19:Neupane T., Myers C.J., Madsen C., Zheng H., Zhang Z. (2019) STAMINA: STochastic Approximate Model-Checker for INfinite-State Analysis. In: Dillig I., Tasiran S. (eds) Computer Aided Verification. CAV 2019. Lecture Notes in Computer Science, vol 11561. Springer, Cham. Download link: https://link.springer.com/chapter/10.1007/978-3-030-25540-4_31Copy CitationSTAMINA 2.5 and STAMINA 3.0 don't yet have papers published about them as they are currently under development. When they do have papers, they will be placed here.STAMINA InformationFLUENT InformationPapers and ResearchSTAMINA/STORMState-space truncation "
}
, {
title:"Documentation - STAMINA Model Checker"
, date:"Thu Jul 28 13:18:42 2022"
, url:"https://staminachecker.org/documentation.html"
, content:"Documentation - STAMINA DocumentationUsage documentationDocumentation for the usage of STAMINA can be found at the wiki. This includes STAMINA usage, GUI, algorithm development, and command-line option documentation. The basic syntax of invoking STAMINA via the command-line is as follows:stamina --storm $MODEL_FILE $PROPERTIES_FILE [OPTIONS]The --storm and --prism options allow you to specify which model checker to use.STAMINA/STORM and STAMINA/PRISM have different sets of options (although there is some overlap), in order to work with their respective model checkers. The stamina executable simply passes the options you give into either STAMINA/STORM or STAMINA/PRISM, so make sure to choose the correct options.STAMINA/STORM Usage and OptionsThe following options are available for STAMINA/STORM -c, --const=\"C1=VAL,C2=VAL,C3=VAL\" Comma separated values for constants -C, --cuddMaxMem=memory Maximum CUDD memory, in the same format as PRISM (default: 1g) -e, --export=filename Export model to a (text) file -f, --approxFactor=double Factor to estimate how far off our reachability predictions will be (default: 2.0) -i, --import=filename Import model to a (text) file -k, --kappa=double Reachability threshold for the first iteration (default: 1.0) -M, --maxIterations=int Maximum iteration for solution (default: 10000) -n, --maxApproxCount=int Maximum number of iterations in the approximation (default 10) -p, --property=propname Specify a certain property to check in a model file that contains many -r, --reduceKappa=double Reduction factor for Reachability Threshold (kappa) during the refinement step (default 2.0) -R, --noPropRefine Do not use property based refinement. If given, the model exploration method will reduce kappa and do property independent definement (default: off) -S, --exportPerimeterStates=filename Export perimeter states to a file. Please provide a filename. This will append to the file if it is existing -t, --exportTrans=filename Export the list of transitions and actions to a specified file name, or to trans.txt if no file name is specified. Transitions are exported in the format <Source State Index> <Destination State Index> <Action Label> -T, --rankTransitions Rank transitions before expanding (default: false) -w, --probWin=double Probability window between lower and upperbound for termination (default: 1.0e-3) -?, --help Give this help list --usage Give a short usage messageSTAMINA/PRISM Usage and OptionsThe following options are available for STAMINA/PRISMUsage: stamina [options] <model-file> <properties-file><model-file> .................... Prism model file. Extensions: .prism, .sm<properties-file> ............... Property file. Extensions: .cslOptions:========-kappa <k>.......................... ReachabilityThreshold for first iteration [default: 1.0]-reducekappa <f>.................... Reduction factor for ReachabilityThreshold(kappa) for refinement step. [default: 1.25]-approxFactor <f>................... Factor to estimate how far off our reachability predictions will be [default: 2.0]-pbwin <e>.......................... Probability window between lower and upperbound for termination. [default: 1.0e-3]-maxapproxcount <n>................. Maximum number of approximation iteration. [default: 10]-noproprefine ...................... Do not use property based refinement. If given, model exploration method will reduce the kappa and do the property independent refinement. [default: off]-cuddmaxmem <memory>................ Maximum cudd memory. Expects the same format as prism [default: 1g]-export <filename>.................. Export model to a file. Please provide a filename without an extension-exportPerimeterStates <filename>... Export perimeter states to a file. Please provide a filename. This will append to the file if it is existing-import <filename>.................. Import model to a file. Please provide a filename without an extension-property <property>................ Specify a specific property to check in a model file that contains many-const <vals> ...................... Comma separated values for constants-exportTrans <filename>............. Export the list of transitions and actions to a specified file name, or to trans.txt if no file name is specified. Transitions exported in the format srcStateIndex destStateIndex actionLabelExamples:-const a=1,b=5.6,c=trueOther Options:========-rankTransitions ................... Rank transitions before expanding. [default: false]-maxiters <n> ...................... Maximum iteration for solution. [default: 10000]-power ............................. Power method-jacobi ............................ Jacobi method-gaussseidel ....................... Gauss-Seidel methodDevelopment DocumentationFor the STORM version, there exists Doxygen documentation.For the PRISM version, there is both Javadoc documentation as well as some markdown files describing each class in the repository.STAMINA InformationFLUENT InformationPapers and ResearchSTAMINA/STORMState-space truncation "
}
, {
title:"Benchmarks - STAMINA Model Checker"
, date:"Thu Jul 28 13:51:08 2022"
, url:"https://staminachecker.org/benchmarks.html"
, content:"Benchmarks - BenchmarksIn most cases, STAMINA/STORM performed better in general than STAMINA/PRISM, even without the dynamic programming. However, with dynamic programming, many of the runtimes STAMINA/STORM has are substantially better than STAMINA/PRISM.Benchmarking was done on an NZXT computer running Debian 11 (Linux 5.10) with the following properties: Processor: AMD Ryzen ThreadRipper 16-Core 32 Threads RAM: 64 GiB DDR4 Graphics Card: SAPPHIREYou may also expand all or collapse all.STAMINA Runtimes vs. Other Model CheckersSTAMINA/STORM 2.5 was compared in runtime to other versions of the STAMINA algorithm, integrated with both PRISM and STORM. Additionally, when the final results for STAMINA compared against itself are finished testing, STAMINA will be compared with other model checkers, such as Modest and Infamy. We cannot directly compare to PRISM or STORM since the models used for testing were unbounded, so both PRISM and STORM would not terminate during the model construction phase.The results below are preliminary results, and don't yet include the Hazard Circuit models, which are the most interesting as they are the largest and often have nested properties. However, even with the existing results, it is evident that STAMINA/STORM 2.5 is substantially faster in general than STAMINA/PRISM or even STAMINA/STORM 2.0. We plan to include full results against all models we will test against in a paper that will be submitted to VMCAI in September.Runtimes Against Other STAMINA Algorithms (in Seconds)Hazard CircuitJackson CircuitPolling SystemRobot WorldTandem QueueToggle SwitchToy ModelUpdatePlease note that these results are preliminary. Full results are expected to be published in a paper this fall. The word \"fail\" next to a runtime means that particular model checker was unable to produce a bound, either because of an OOM (out of memory) error, or another error.Please select a model class above and click \"update\".STAMINA Probability Results vs. Other Model CheckersSTAMINA/STORM was able to consistently and accurately predict probability windows for CSL properties for all tests in the preliminary testing. Again, when full testing is complete (i.e., comparison against other model estimation tools including MODEST and INFAMY), they will be published in a paper, probably sometime in Fall 2022.Hazard CircuitJackson CircuitPolling SystemRobot WorldTandem QueueToggle SwitchToy ModelUpdateThe values in this table are the probability windows, i.e., PMAX - PMIN. The closer they are to 0.0, the more accurate bound STAMINA was able to produce. An empty value means that this model checker was unable to produce a probability bound.Please select a model class above and click \"update\".STAMINA Number of States Generated vs. Other Model CheckersAccording to the preliminary results, the state-counts were fairly similar between STAMINA/STORM and STAMINA/PRISM, however, STAMINA/STORM was able to explore more states quicker and with less memory impact than STAMINA/PRISM. Additionally, because STAMINA/STORM builds the transition matrix within its own code (relying on STORM classes to do so), rather than requiring the STORM API to do so, even within STAMINA/STORM, the same number of states can be explored with less work than STAMINA/PRISM.Full results will be published here after testing is complete.STAMINA InformationFLUENT InformationPapers and ResearchSTAMINA/STORMState-space truncation "
}
];

let createHTML = function (article, id) {
	let html =
	'<div id="search-result-' + id + '">' +
	'<a class="search-result" href="' + article.url + '">' +
	'<span class="aside">' +
	article.date +
	'</span>' +
	'<h2>' + article.title + '</h2>' +
	article.content.slice(0, 150) + '...<br><br><span style="color: var(--accent-low-sat);">' +
	article.url +
	'</span></a>' +
	'</div>';
	return html;
};

function displayResults(results) {
	let resultsDiv = document.getElementById('search-results');
	// Show results
	if (results.length < 1) {
		resultsDiv.innerHTML += "<div class='error'>No results</div>";
		return;
	}
	let html = '<p>Found ' + results.length + ' matching results</p>';
	html += results.map(function (article, index) {
		return createHTML(article, index);
	}).join('');
	
	resultsDiv.innerHTML = html;
}

function searchCustom(query) {
	console.log("Searching for query: " + query);
	let reg = new RegExp(query, 'gi');
	let titlePriority = [];
	let bodyPriority = [];
	
	// Actually perform search
	pages.forEach(function (article) {
		if (reg.test(article.title)) return titlePriority.push(article);
			if (reg.test(article.content)) bodyPriority.push(article);
	});
	
	// Combine the results
	let results = [].concat(titlePriority, bodyPriority);
	
	displayResults(results);
}
